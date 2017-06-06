# Part 2-1 Development common sense
* [객체 지향 프로그래밍이란 무엇인가](#object-oriented-programming)
	* 객체 지향 개발 원칙은 무엇인가?
* [RESTful API란](#restful-api)
* TDD란 무엇이며 어떠한 장점이 있는가?
* MVC 패턴이란 무엇인가?


[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-Development-common-sense)
</br>

## Object Oriented Programming
객체 지향 프로그래밍. 저도 잘 모르고 거대한 부분이라서 넣을지 말지 많은 고민을 했습니다만, 면접에서 이 정도 이야기하면 되지 않을까?하는 생각에 조심스레 적어봤습니다.

객체 지향 프로그래밍 이전의 프로그래밍 패러다임을 살펴보면, 중심이 컴퓨터에 있었다. 컴퓨터가 사고하는대로 프로그래밍을 하는 것이다. 하지만 객체지향 프로그래밍이란 인간 중심적 프로그래밍 패러다임이라고 할 수 있다. 즉, 현실 세계를 프로그래밍으로 옮겨와 프로그래밍하는 것을 말한다. 현실 세계의 사물들을 객체라고 보고 그 객체로부터 개발하고자 하는 애플리케이션에 필요한 특징들을 뽑아와 프로그래밍 하는 것이다. 이것을 추상화한다.

OOP로 프로그래밍을 코드를 작성하면 이미 작성한 코드에 대한 재사용성이 높다. 자주 사용되는 로직을 라이브러리로 만들어두면 계속해서 사용할 수 있으며 그 신뢰성을 확보 할 수 있다. 또한 라이브러리를 각종 예외상황에 맞게 잘 만들어두면 개발자가 사소한 실수를 하더라도 그 에러를 컴파일 단계에서 잡아낼 수 있으므로 버그 발생이 줄어든다. 또한 내부적으로 어떻게 동작하는지 몰라도 개발자는 라이브러리가 제공하는 기능들을 사용할 수 있기 때문에 생산성이 높아지게 된다. 객체 단위로 코드가 나눠져 작성되기 때문에 디버깅이 쉽고 유지보수에 용이하다. 또한 데이터 모델링을 할 때 객체와 매핑하는 것이 수월하기 때문에 요구사항을 보다 명확하게 파악하여 프로그래밍 할 수 있다.

객체 간의 정보 교환이 모두 메시지 교환을 통해 일어나므로 실행 시스템에 많은 overhead가 발생하게 된다. 하지만 이것은 하드웨어의 발전으로 많은 부분 보완되었다. 객체 지향 프로그래밍의 치명적인 단점은 함수형 프로그래밍 패러다임의 등장 배경을 통해서 알 수 있다. 바로 객체가 상태를 갖는다는 것이다. 변수가 존재하고 이 변수가 특정 상태를 갖게 되어 애플리케이션 내부에서 버그를 발생시킨다는 것이다. 이러한 이유로 함수형 패러다임이 현재 주목받고 있다.

### 객체 지향적 설계 원칙
1. SRP(Single Responsibility Principle) : 단일 책임 원칙
  클래스는 단 하나의 책임을 가져야 하며 클래스를 변경하는 이유는 단 하나의 이유이어야 한다.
2. OCP(Open-Closed Principle) : 개방-폐쇄 원칙
  확장에는 열려 있어야 하고 변경에는 닫혀 있어야 한다.
3. LSP(Likov Substitution Principle) : 리스코프 치환 원칙
  상위 타입의 객체를 하위 타입의 객체로 치환해도 상위 타입을 사용하는 프로그램은 정상적으로 동작해야 한다.
4. ISP(Interface Segregation Principle) : 인터페이스 분리 원칙
  인터페이스는 그 인터페이스를 사용하는 클라이언트를 기준으로 분리해야 한다.
5. DIP(Dependency Inversion Principle) : 의존 역전 원칙
  고수준 모듈은 저수준 모듈의 구현에 의존해서는 안된다.

#### Reference
* http://asfirstalways.tistory.com/177
*

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-Development-common-sense)

</br>

## RESTful API
우선, 위키백과의 정의를 요약해보자면 다음과 같다.

> 월드 와이드 웹(World Wide Web a.k.a WWW)과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처의 한 형식으로 자원을 정의하고 자원에 대한 주소를 지정하는 방법 전반에 대한 패턴

`REST`란, REpresentational State Transfer의 약자이다. 여기에 ~ful이라는 형용사형 어미를 붙여 ~한 API라는 표현으로 사용된다. 즉, REST의 기본 원칙을 성실히 지킨 서비스 디자인은 'RESTful'하다라고 표현할 수 있다.

`REST`가 디자인 패턴이다, 아키텍처다 많은 이야기가 존재하는데, 하나의 아키텍처로 볼 수 있다. 좀 더 정확한 표현으로 말하자면, REST는 `Resource Oriented Architecture` 이다. API 설계의 중심에 자원(Resource)이 있고 HTTP Method를 통해 자원을 처리하도록 설계하는 것이다.

### REST 6가지 원칙
* Uniform Interface
* Stateless
* Caching
* Client-Server
* Hierachical system
* Code on demand
_cf) 보다 자세한 내용에 대해서는 Reference를 참고해주세요._

### RESTful하게 API를 디자인 한다는 것은 무엇을 의미하는가.(요약)
1. **리소스** 와 **행위** 를 명시적이고 직관적으로 분리한다.
  * 리소스는 `URI`로 표현되는데 리소스가 가리키는 것은 `명사`로 표현되어야 한다.
  * 행위는 `HTTP Method`로 표현해고, `GET(조회)`, `POST(생성)`, `PUT(기존 entity 전체 수정)`, `PATCH(기존 entity 일부 수정)`, `DELETE(삭제)`을 분명한 목적으로 사용한다.

2. Message는 Header와 Body를 명확하게 분리해서 사용한다.
  * Entity에 대한 내용은 body에 담는다.
  * 애플리케이션 서버가 행동할 판단의 근거가 되는 컨트롤 정보인 API 버전 정보, 응답받고자 하는 MIME 타입 등은 header에 담는다.
  * header와 body는 http header 와 http body로 나눌 수도 있고, http body에 들어가는 json 구조로 분리할 수도 있다.

3. API 버전을 관리한다.
  * 환경은 항상 변하기 때문에 API의 signature 가 변경될 수도 있음에 유의하자.
  * 특정 API를 변경할 때는 반드시 하위호환성을 보장해야 한다.

4. 서버와 클라이언트가 같은 방식을 사용해서 요청하도록 한다.
  * 브라우저는 form-data 형식의 submit으로 보내고 서버에서는 json 형태로 보내는 식의 분리보다는 json으로 보내든, 둘 다 form-data 형식으로 보내든 하나로 통일한다.
  * 다른 말로 표현하자면 URI가 플랫폼 중립적이어야 한다.

### 어떠한 장점이 존재하는가?
1. Open API를 제공하기 쉽다
2. 멀티플랫폼 지원 및 연동이 용이하다.
3. 원하는 타입으로 데이터를 주고 받을 수 있다.
4. 기존 웹 인프라(HTTP)를 그대로 사용할 수 있다.
5. 각각의 요청에 독립적으로 반응하여 세션을 사용하지 않는다.

### 단점은 뭐가 있을까?
1. 사용할 수 있는 메소드가 4가지 밖에 없다.
2. 분산환경에는 부적합하다
3. HTTP 통신 모델에 대해서만 지원한다.

위 내용은 간단히 요약된 내용이므로 보다 자세한 내용은 다음 Reference를 참고하시면 됩니다 :)
##### Reference
* http://meetup.toast.com/posts/92
* https://blog.npcode.com/2017/03/02/%EB%B0%94%EC%81%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%93%A4%EC%9D%84-%EC%9C%84%ED%95%9C-rest-%EB%85%BC%EB%AC%B8-%EC%9A%94%EC%95%BD/
* https://spoqa.github.io/2012/02/27/rest-introduction.html

</br>

</br>

_Development_common_sense.end_  
[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-Development-common-sense)
