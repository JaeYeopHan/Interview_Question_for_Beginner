# Kubernetes
- [쿠버네티스 이해](#쿠버네티스-이해)
- [클러스터 생성](#클러스터-생성)
- [파드와 디플로이먼트 컨테이너 실행](#파드와-디플로이먼트-컨테이너-실행)
    - [애플리케이션 매니페스트 배포 정의](#애플리케이션-매니페스트-배포-정의)
    - [파드에서 실행 중인 애플리케이션에 접근](#파드에서-실행-중인-애플리케이션에-접근)
    - [리소스 관리](#리소스-관리)
- [네트워크를 통해 서비스에 파드 연결](#네트워크를-통해-서비스에-파드-연결)
    - [쿠버네티스 내부의 네트워크 트래픽 라우팅](#쿠버네티스-내부의-네트워크-트래픽-라우팅)
    - [파드와 파드 간 통신](#파드와-파드-간-통신)
    - [외부 트래픽 파드 전달](#외부-트래픽-파드-전달)
    - [클러스터 외부로 트래픽 전달](#클러스터-외부로-트래픽-전달)
- [컨피그맵과 비밀값으로 애플리케이션 설정](#컨피그맵과-비밀값으로-애플리케이션-설정)
    - [애플리케이션에 설정이 전달되는 과정](#애플리케이션에-설정이-전달되는-과정])
    - [컨피그맵에 저장한 설정 파일 사용](#컨피그맵에-저장한-설정-파일-사용)
    - [컨피그맵에 담긴 설정값 데이터 주입](#컨피그맵에-담긴-설정값-데이터-주입)
    - [비밀값을 이용 민감한 정보가 담긴 설정값 관리](#비밀값을-이용-민감한-정보가-담긴-설정값-관리)
    - [애플리케이션 설정 관리](#애플리케이션-설정-관리)

[뒤로](https://github.com/JaeYeopHan/for_beginner)

</br>

## 쿠버네티스 이해
쿠버네티스는 컨테이너를 실행하는 플랫폼이다. 컨테이너화된 애플리케이션의 시작, 롤링 업데이트, 서비스 수준 유지, 수요에 따른 스케일링, 보안 접근등 다양한 기능을 제공한다.
쿠버네티스 개념
- API : 최종사용자,클러스터의 다른 부분 그리고 외부 컴포넌트가 서로 통신 할 수 있도록 HTTP API를 제공한다.
- 클러스터 : 여러 개의 서버 노드로 구성된 하나의 논리적 단위이며, 애플리케이션을 실행하기 위한 노드 머신이다.

## 클러스터 생성
- 애저,AWS 환경에서 단일 노드 쿠버네티스 클러스터 생성하기
   ```애저
      #애저 서비스에 로그인
      az login
  
      # 클러스터를 만들기 위한 리소스 그룹 생성
      az group create --name user --location eastus
  
      # 단일 노드 클러스터 생성
      az aks create --resource-group user --name user-aks --node -count 1 --no
      de-vm-size Standard_DS2_v2 --kubernetes-version 1.18.8 --generate-ssh-keys
      
      # 클러스터를 다루기 위한 인증서 받기
      az aks get-credentials --resource-group user --name user-aks
   ```

   ```AWS
      # EKS는 AWS에서 제공되는 managed cluster service이다.
      # EKSCTL 설치하기(macOS)
      brew tap weaveworks/tap
      brew install weaveworks/tap/eksctl
   
      # EKSCTL 설치하기(window)
      choco install eksctl
   
      # EKSCTL 설치하기(리눅스)
      curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/
      eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp sudo mv -v /tmp/eksctl /usr/local/bin
   
      # 단일 노드 클러스터 생성
      eksctl create cluster --name=user --nodes=1 --node-type=t3.large
   ```

- 생성한 클러스터 확인하기
   ```
   kubectl get nodes
   ```
## 파드와 디플로이먼트 컨테이너 실행
- 파드란 '쿠버네티스가 컨테이너를 실행하는 수단'</br>
  하나 그 이상의 컨테이너를 관리하는 데 사용하는 단위이다. 스토리지 및 네트워크를 공유하고, 해당 컨테이너를 구동하는 방식에 대한 명세를 갖는다.</br>
  파드는 원시 타입 리소스이므로 일반적으로 파드를 직접 실행할 일은 없다.</br>
  대개는 파드를 관리할 컨트롤러 객체를 따로 만들게 된다.
- 디플로이먼트란  '파드를 주로 관리하는 컨트롤러 객체' </br>
  파드는 컨테이너와 마찬가지로 생애 주기가 짧아 디플로이먼트 같은 고수준 리소스를 이용하여 파드 관리를 맡는다.
- 웹 애플리케이션을 실행하는 디플로이먼트
  ```
   # sample 생성
   kubectl create deployment sample --image=sample/sample
   # 파드 목록 출력
   kubectl get pods
   
   디플로이먼트가 생성한 파드 이름은 컨트롤러 객체 이름 뒤에 무작위 문자열을 덧붙이는 형태로 붙여진다.
   
  ```
  디플로이먼트만 만들면 우리에게 필요한 파드를 대신 만들어 준다.


## 애플리케이션 매니페스트 배포 정의
- 애플리케이션 매니페스트란 '애플리케이션을 속속이 기술하는 스크립트'
  ```pod.yaml
  # 쿠버네티스 API의 버전과 정의하려는 리소스의 유형 기술
  apiVersion: v1
  kind: Pod
  
  # 리소스의 이름(필수 요소)와 레이블(비필수 요소)
  metadata:
   name: sample
  
  # 리소스의 실제 정의 내용
  # 파드의 경우 실행할 컨테이너 정의
  # 컨테이너 이름과 이미지로 정의된다.
  spec:
   containers:
    - name: web
      image: sample/sample
  ```
  ```YAML 파일 실행
  # 해당 디렉터리로 이동
  cd sample
  
  # 매니페스트 파일로 애플리케이션 배포
  kubectl apply -f pod.yaml
  
  # 실행 중인 파드 목록 확인
  kubectl get pods
  ```

## 파드에서 실행 중인 애플리케이션에 접근
- kubectl을 사용하여 파드 안에 있는 컨테이너에 접근하기(로그 열람)
 ```
 # 파드의 내부 IP 주소 확인
 kubectl get pod sample - o custom-cloumns=NAME:metadata.name,POD_ID:sttatus.podIP
 
 # 파드 내부와 연결할 대화형 셸 실행
 kubectl exec -it sample sh
 
 # 파드 안에서 IP 주소 확인
 hostname -i
 
 # 웹 애플리케이션의 동작 확인
 wget -0 - http://localhost | head -n 4
 
 # 셸 세션 종료
 exit

 ```

## 리소스 관리
- 컨트롤러 객체는 자신이 관리하는 리소스의 생애 주기를 관장하며 이에 대한 외부 간섭을 용인 하지 않는다.
 ```delete 리소스 삭제
    
    # 실행중인 모든 파드의 목록 출력
    kubectl get pods
    
    # 모든 파드 삭제
    kubectl delete pods -all
    -> 파드를 모두 삭제 했어도 디플로이먼트가 자신이 관리하던 파드를 대체할 새로운 파드를 만들게 된다.
    
    # 모든 파드가 삭제되었는지 확인
    kubectl get pods
   
    컨트롤러 객체(ex.디플로이먼트)를 삭제하게 되면 자신이 관리하던 리소스를 말끔히 제거하고 삭제된다.
 ```

# 네트워크를 통해 서비스에 파드 연결
모든 파드는 서로 통신 할 수 있어야 한다. 파드끼리 통신을 위해 쿠버네티스는 표준 네트워크 프로토콜인 TCP와 UDP를 지원한다.

## 쿠버네티스 내부의 네트워크 트래픽 라우팅
파드가 새로운 파드로 교체될 때 IP주소가 바뀌게 되어 교체된 파드의 새로운 IP주소를 찾기가 어렵다. 새로운 IP주소는 쿠버네티스 API를 통해서만 파악할 수 있다.
해결책으로 쿠버네티스 클러스터에는 전용DNS 서버가 있어 서비스 이름과 IP주소를 대응시켜 준다. 서비스를 경유해서 파드는 서로 고정된 도메인 네임으로 통신 할 수 있다.

## 파드와 파드 간 통신
서비스의 유형 중 가장 기본이 되는 것을 클러스터IP라고 한다. 파드와 파드 간 통신에서만 쓰인다. 내부에서는 접근이 가능하되 외부의 접근을 차단해야 하는
분산 시스템의 컴포넌트에 적합하다.
 ```api-service.yaml 서비스 정의
 apiVersion: v1
 kind: Service
 
 metadata:
    name: api
 spect:
    ports:
        -port: 80
    selector:
        app: sample-api
    type: ClusterIP
    
 ```

## 외부 트래픽 파드 전달
- 로드밸런서 : 로컬 개발 환경과 운영 환경 어디라도 적용 할 수 있는 방법, 로드밸런서 서비스를 클러스테 배치하면 끝.

   ```web-service.yaml 외부 트래픽을 전달하는 로드밸런서 서비스의 정의
    apiVersion: v1
    kind: Service
  
    metadata:
       name: sample-web
    spec:
       ports:
        - port: 8080     # 서비스가 주시하는 포트
        targetPort: 80   # 트래픽이 전달될 파드의 포트
       selector:
           app: sample
       type: LoadBalancer
  ```
  AKS(Azure Kubernetes Service), EKS(Elastic Kubernetes Service) 와 같은 클라우드 환경의 쿠버네티스는 고가용성을 확보한 다중 노드 클러스터다.
  이들 클러스터에서 로드 밸런서 서비스를 배포하면 클라우드에 실제 로드밸런서가 만들어진다. 이 로드밸런서가 외부에서 들어오는 트래픽을 노드로 전달하고
  쿠버네티스가 이를 다시 파드로 전달한다.

- 노드포트 : 클러스터를 구성하는 모든 노드가 이 서비스에 지정된 포트를 주시하며 들어온 트래픽을 대상 파드의 대상 포트로 전달한다.
  서비스에서 설정된 포트가 모든 노드에서 개방되어 있어야 하기 때문에 로드밸런서 서비스 만큼 유연하지는 않다.
  ``` web-service-nodePort.yaml 노드포트 서비스의 정의 예
   apiVersion: v1
   kind: Service
  
   metadata:
    name: sample-node
  
   spec:
     ports:
       - port: 8080       # 다른 파드가 서비스에 접근하기 위해 사용하는 포트
       targetPort: 80     # 대상 파드에 트래픽을 전달하는 포트
       nodePort: 30080    # 서비스가 외부에 공개되는 포트
  
  ```

## 클러스터 외부로 트래픽 전달
- 익스터널네임 : 애플리케이션 파드에서 로컬 네임을 사용한다. </br>
  쿠버네티스 DNS서버에 이 로컬 네임을 조회하면 외부 도메인으로 해소해 주는 방식
  클러스터 이부로 요청을 전달하는 리다이렉션과 같은 기능을 한다.

  ``` external.yaml 익스터널네임 서비스의 정의 예
    apiVersion: v1
    kind: Service
  
    metadata:
        name: sample  # 클러스터 안에서 쓰이는 로컬 도메인 네임
    spec:
        type: ExternalName
        externalName: https://kubernetes.io/ko/ # 로컬 도메인 네임을 해소할 외부 도메인
        
  ```

- 헤드리스 서비스 : IP주소를 대체해주는 방법, </br>
  클러스터IP의 형태로 정의되지만 레이블 셀렉터가 없기 때문에 대상 파드가 없다. </br>
  그 대신 헤드리스 서비스는 자신이 제공해야 할 IP주소의 목록이 담긴 엔드포인트 리소스와 함께 배포된다.

  ```headless.yaml 명시적 주소를 담은 서비스
  apiVersion: v1
  kind: Service
  metadata:
    name: sample
  spect:
    type: ClusterIP    # selector 필드가 없으므로 헤드리스 서비스가 됨
    ports:
     - port: 80
   ----
   kind: Endpoints     # 한 파일에 두 번째 리소스의 정의
   apiVersion: v1
   metadata:
    name: sample2
   subsets:
    - addresses:       # 정적 IP 주소 목록
     - ip: 192.168.123.234
    ports:
      - ports: 80      # 각 IP주소에서 주시할 포트
  ```
# 컨피그맵과 비밀값으로 애플리케이션 설정
컨테이너 환경설정값 정의
- 컨피그맵 : 파드에서 읽어 들이는 데이터를 저장하는 리소스이다. </br>
  데이터의 형태는 한 개 이상의 키-값 쌍, 테긋트, 바이너리 파일까지 다양하며, </br>
  JSON, XML, YAML, TOML, INI 등 설정 파일을 파드에 전달할 수 있다. (읽기 전용)
- 비밀값 : 암호, 토큰 또는 키와 같은 소량의 중요한 데이터를 포함하는 오브젝트이다. </br>
  기본적으로 API서버의 기본 데이터저장소(etcd)에 암호화되지 않은 상태로 저장된다. </br></br>

    컨피그맵과 비밀값은 다른 리소스와 달리 스스로 어떤 기능을 하지는 않는다. 
    단지 적은 양의 데이터를 저장하는 것이 목적이다.

## 애플리케이션에 설정이 전달되는 과정

   ``` 파드 정의에서 컨피그맵 읽어 들이기
      env:                              # 컨테이너 정의의 환경 변수 부분
        - name: sample
          value: "04"                   # 환경 변수의 값
        - name: sample2
          valueFrom:
            configMapKeyRef:            # 컨피그맵에서 읽어 들이라는 의미
            name: config-sample         # 컨피그맵 이름
            key: sample.section         # 컨피그맵에서 읽어 들일 항목 이름
   
   ```

## 컨피그맵에 저장한 설정 파일 사용

   ``` 컨피그맵 생성
      # 환경 파일의 내용으로 컨피그맵 생성
      kubectl create configmap config-env-file --from-env-file=sample/test.env
   
      # 컨피그맵의 상세 정보 확인
      kubectl get cm config-env-file
      
      # 새로운 컨피그 맵의 설정을 적용하여 파드 업데이트
      kubectl apply -f sample/config-env-file.yaml
     
   ```
환경 변수 이름이 중복되는 경우 env 항목에서 정의된 값이 envFrom 항목에서 정의된 값에 우선한다.

## 컨피그맵에 담긴 설정값 데이터 주입
컨테이너 파일 시스템 속 파일로 설정값을 주입한다.</br>
컨피그맵은 디렉터리 형태로 파드 속 컨테이너에 주입된다. 컨피그맵 속 항목은 파일이 된다.</br>
컨피그맵을 컨테이너 파일 시스템의 디렉터리 형태로 읽어 들일 수 있다.

볼륨 : 컨피그맵에 담긴 데이터를 파드로 전달 </br>
볼륨 마운트 : 컨피그맵을 읽어 들인 볼륨을 파드 컨테이너의 특정 경로에 위치시키는 볼륨 마운트
  ```컨피그 맵을 볼륨 마운트 형태로 읽어 들인다.
  spec
    containers:
        - name: web
          image: sample
          volumeMounts:          # 컨테이너에 볼륨을 마운트한다.
            - name: config       # 마운트할 볼륨 이름
              mountPath: "/path" # 볼륨이 마운트 될 경로
              readOnly: true     # 볼륨을 읽기 전용으로
          volumes:               # 볼륨을 파드 수준에서 정의된다.
            - name: config       # 이 이름이 볼륨 마운트의 이름과 일치해야한다. 
              configMap:         # 볼륨의 원본은 컨피그맵이다
                name: configMapName # 내용을 읽어 올 컨피그맵 이름  
  ```
컨피그맵을 디렉터리 형태로 읽어 들이면 다양한 애플리케이션 설정 방법을 적용할 수 있다.

## 비밀값을 이용 민감한 정보가 담긴 설정값 관리
비밀값(시크릿)
- 민감한 정보를 다뤄 클러스터 내부에서 별도로 관리된다.</br>
- 해당값을 사용해야하는 노드에만 전달되며, 디스크에 저장하지 않고 메모리에만 담긴다. </br>
    - 항상 암호화 상태가 유지되는 것은 아니다. 비빌값 객체에 접근할 권한이 있다면 비밀값의 평문을 읽을 수 있다.

        ``` 비밀값 확인
           # 평문 리터럴로 비밀값 생성 
           kubectl create secret generic sleep-secret-literal --from-literal=secret=shh..
    
           # 비밀값의 상세 정보 확인
           kubectl describe secret sleep-secret-literal
    
           # 비밀값의 평문 확인(Base64로 인코딩됨)
           kubectl get secret sleep-secret-literal -o jsonpath='{.data.secret}'
      
           # 비밀값의 평문 확인 -> 완전한 평문을 보려면 Base64 디코더로 값을 파이필 해야한다.
           kubectl get secret sleep-secret-literal -o jsonpath='{.data.secret}' } | base64 -d
        ```

        ```비밀값을 주입받는 파드 정의
          spec
              containers:
                  - name: sleep
                    image: kiamol/ch03-sleep
                    env:                              # 환경 변수 정의
                    - name: KIAMOL_SECRET             # 컨테이너에 전달될 환경 변수 이름
                      valueFrom:                      # 환경 변수의 값은 외부에서 도입
                      secretKeyRef:                   # 비밀값에서 도입
                          name: sleep-secret-literal  # 비밀값 이름
                          key: secret                 # 비밀값의 항목 이름
        ```

## 애플리케이션 설정 관리

- 애플리케이션의 중단 없이 설정 변경 : 객체의 이름에 버전 명명법을 도입하고 애플리케이션을 업데이트할 때 새로운 설정 객체를 배치한 후</br>
  새로운 설정 객체를 가리키게 애플리케이션 정의를 수정하는 방식
- 민감 정보 관리 : YAML 템플릿 파일에는 빈칸으로 두고 보안저장소를 따로 두어 관리.


### Reference
* [쿠버네티스 공식문서](https://kubernetes.io/ko/docs/concepts/)
* (도서) [쿠버네티스 교과서](https://product.kyobobook.co.kr/detail/S000208711643)