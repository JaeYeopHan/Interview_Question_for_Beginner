# Part 2-1 Development common sense
* 객체 지향 프로그래밍이란 무엇인가?
	* 객체 지향 개발 원칙은 무엇인가?
* [RESTful API란](#restful-api)
* TDD란 무엇이며 어떠한 장점이 있는가?
* MVC 패턴이란 무엇인가?


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
