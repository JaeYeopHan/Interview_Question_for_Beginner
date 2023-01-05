# Part 1-1 Development common sense

* [좋은 코드란 무엇인가](#좋은-코드란-무엇인가)
* [객체 지향 프로그래밍이란 무엇인가](#object-oriented-programming)
  * 객체 지향 개발 원칙은 무엇인가?
* [RESTful API 란](#restful-api)
* [TDD 란 무엇이며 어떠한 장점이 있는가](#tdd)
* [함수형 프로그래밍](#함수형-프로그래밍)
* [MVC 패턴이란 무엇인가?](http://asfirstalways.tistory.com/180)
* [Git 과 GitHub 에 대해서](#git-과-github-에-대해서)

[뒤로](https://github.com/JaeYeopHan/for_beginner)

</br>

## 좋은 코드란 무엇인가

‘좋은 코드란?‘이라고 구글링해보면 많은 검색 결과가 나온다. 나도 그렇고 다들 궁금했던듯하다. ‘좋은 코드’란 녀석은 정체도, 실체도 없이 이 세상에 떠돌고 있다. 모두가 ‘좋은 코드’의 기준이 조금씩 다르고 각각의 경험을 기반으로 좋은 코드를 정의하고 있다. 세간에 좋은 코드의 정의는 정말 많다.

- 읽기 쉬운 코드
- 중복이 없는 코드
- 테스트가 용이한 코드

등등… 더 읽어보기 > https://jbee.io/etc/what-is-good-code/

## Object Oriented Programming

_객체 지향 프로그래밍. 저도 잘 모르고 너무 거대한 부분이라서 넣을지 말지 많은 고민을 했습니다만, 면접에서 이 정도 이야기하면 되지 않을까?하는 생각에 조심스레 적어봤습니다._

객체 지향 프로그래밍 이전의 프로그래밍 패러다임을 살펴보면, 중심이 컴퓨터에 있었다. 컴퓨터가 사고하는대로 프로그래밍을 하는 것이다. 하지만 객체지향 프로그래밍이란 인간 중심적 프로그래밍 패러다임이라고 할 수 있다. 즉, 현실 세계를 프로그래밍으로 옮겨와 프로그래밍하는 것을 말한다. 현실 세계의 사물들을 객체라고 보고 그 객체로부터 개발하고자 하는 애플리케이션에 필요한 특징들을 뽑아와 프로그래밍 하는 것이다. 이것을 추상화라한다.

OOP 로 코드를 작성하면 이미 작성한 코드에 대한 재사용성이 높다. 자주 사용되는 로직을 라이브러리로 만들어두면 계속해서 사용할 수 있으며 그 신뢰성을 확보 할 수 있다. 또한 라이브러리를 각종 예외상황에 맞게 잘 만들어두면 개발자가 사소한 실수를 하더라도 그 에러를 컴파일 단계에서 잡아낼 수 있으므로 버그 발생이 줄어든다. 또한 내부적으로 어떻게 동작하는지 몰라도 개발자는 라이브러리가 제공하는 기능들을 사용할 수 있기 때문에 생산성이 높아지게 된다. 객체 단위로 코드가 나눠져 작성되기 때문에 디버깅이 쉽고 유지보수에 용이하다. 또한 데이터 모델링을 할 때 객체와 매핑하는 것이 수월하기 때문에 요구사항을 보다 명확하게 파악하여 프로그래밍 할 수 있다.

객체 간의 정보 교환이 모두 메시지 교환을 통해 일어나므로 실행 시스템에 많은 overhead 가 발생하게 된다. 하지만 이것은 하드웨어의 발전으로 많은 부분 보완되었다. 객체 지향 프로그래밍의 치명적인 단점은 함수형 프로그래밍 패러다임의 등장 배경을 통해서 알 수 있다. 바로 객체가 상태를 갖는다는 것이다. 변수가 존재하고 이 변수를 통해 객체가 예측할 수 없는 상태를 갖게 되어 애플리케이션 내부에서 버그를 발생시킨다는 것이다. 이러한 이유로 함수형 패러다임이 주목받고 있다.

### 객체 지향적 설계 원칙

1.  SRP(Single Responsibility Principle) : 단일 책임 원칙  
    클래스는 단 하나의 책임을 가져야 하며 클래스를 변경하는 이유는 단 하나의 이유이어야 한다.
2.  OCP(Open-Closed Principle) : 개방-폐쇄 원칙  
    확장에는 열려 있어야 하고 변경에는 닫혀 있어야 한다.
3.  LSP(Liskov Substitution Principle) : 리스코프 치환 원칙  
    상위 타입의 객체를 하위 타입의 객체로 치환해도 상위 타입을 사용하는 프로그램은 정상적으로 동작해야 한다.
4.  ISP(Interface Segregation Principle) : 인터페이스 분리 원칙  
    인터페이스는 그 인터페이스를 사용하는 클라이언트를 기준으로 분리해야 한다.
5.  DIP(Dependency Inversion Principle) : 의존 역전 원칙  
    고수준 모듈은 저수준 모듈의 구현에 의존해서는 안된다.

#### Reference

* [객체 지향에 대한 얕은 이해](http://asfirstalways.tistory.com/177)

#### Personal Recommendation

* (도서) [객체 지향의 사실과 오해](http://www.yes24.com/24/Goods/18249021)
* (도서) [객체 지향과 디자인 패턴](http://www.yes24.com/24/Goods/9179120?Acode=101)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-1-1-development-common-sense)

</br>

## RESTful API

우선, 위키백과의 정의를 요약해보자면 다음과 같다.

> 월드 와이드 웹(World Wide Web a.k.a WWW)과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처의 한 형식으로 자원을 정의하고 자원에 대한 주소를 지정하는 방법 전반에 대한 패턴

`REST`란, REpresentational State Transfer 의 약자이다. 여기에 ~ful 이라는 형용사형 어미를 붙여 ~한 API 라는 표현으로 사용된다. 즉, REST 의 기본 원칙을 성실히 지킨 서비스 디자인은 'RESTful'하다라고 표현할 수 있다.

`REST`가 디자인 패턴이다, 아키텍처다 많은 이야기가 존재하는데, 하나의 아키텍처로 볼 수 있다. 좀 더 정확한 표현으로 말하자면, REST 는 `Resource Oriented Architecture` 이다. API 설계의 중심에 자원(Resource)이 있고 HTTP Method 를 통해 자원을 처리하도록 설계하는 것이다.

### REST 6 가지 원칙

* Uniform Interface
* Stateless
* Caching
* Client-Server
* Hierarchical system
* Code on demand  
  _cf) 보다 자세한 내용에 대해서는 Reference 를 참고해주세요._

### RESTful 하게 API 를 디자인 한다는 것은 무엇을 의미하는가.(요약)

1.  **리소스** 와 **행위** 를 명시적이고 직관적으로 분리한다.

* 리소스는 `URI`로 표현되는데 리소스가 가리키는 것은 `명사`로 표현되어야 한다.
* 행위는 `HTTP Method`로 표현하고, `GET(조회)`, `POST(생성)`, `PUT(기존 entity 전체 수정)`, `PATCH(기존 entity 일부 수정)`, `DELETE(삭제)`을 분명한 목적으로 사용한다.

2.  Message 는 Header 와 Body 를 명확하게 분리해서 사용한다.

* Entity 에 대한 내용은 body 에 담는다.
* 애플리케이션 서버가 행동할 판단의 근거가 되는 컨트롤 정보인 API 버전 정보, 응답받고자 하는 MIME 타입 등은 header 에 담는다.
* header 와 body 는 http header 와 http body 로 나눌 수도 있고, http body 에 들어가는 json 구조로 분리할 수도 있다.

3.  API 버전을 관리한다.

* 환경은 항상 변하기 때문에 API 의 signature 가 변경될 수도 있음에 유의하자.
* 특정 API 를 변경할 때는 반드시 하위호환성을 보장해야 한다.

4.  서버와 클라이언트가 같은 방식을 사용해서 요청하도록 한다.

* 브라우저는 form-data 형식의 submit 으로 보내고 서버에서는 json 형태로 보내는 식의 분리보다는 json 으로 보내든, 둘 다 form-data 형식으로 보내든 하나로 통일한다.
* 다른 말로 표현하자면 URI 가 플랫폼 중립적이어야 한다.

### 어떠한 장점이 존재하는가?

1.  Open API 를 제공하기 쉽다
2.  멀티플랫폼 지원 및 연동이 용이하다.
3.  원하는 타입으로 데이터를 주고 받을 수 있다.
4.  기존 웹 인프라(HTTP)를 그대로 사용할 수 있다.

### 단점은 뭐가 있을까?

1.  사용할 수 있는 메소드가 한정적이다.
2.  분산환경에는 부적합하다.
3.  HTTP 통신 모델에 대해서만 지원한다.

위 내용은 간단히 요약된 내용이므로 보다 자세한 내용은 다음 Reference 를 참고하시면 됩니다 :)

##### Reference

* [우아한 테크톡 - REST-API](https://www.youtube.com/watch?v=Nxi8Ur89Akw)
* [REST API 제대로 알고 사용하기 - TOAST](http://meetup.toast.com/posts/92)
* [바쁜 개발자들을 위한 RESTFul api 논문 요약](https://blog.npcode.com/2017/03/02/%EB%B0%94%EC%81%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EB%93%A4%EC%9D%84-%EC%9C%84%ED%95%9C-rest-%EB%85%BC%EB%AC%B8-%EC%9A%94%EC%95%BD/)
* [REST 아키텍처를 훌륭하게 적용하기 위한 몇 가지 디자인 팁 - spoqa](https://spoqa.github.io/2012/02/27/rest-introduction.html)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-1-1-development-common-sense)

</br>

## TDD

### TDD 란 무엇인가

Test-Driven Development(TDD)는 매우 짧은 개발 사이클의 반복에 의존하는 소프트웨어 개발 프로세스이다. 우선 개발자는 요구되는 새로운 기능에 대한 자동화된 테스트케이스를 작성하고 해당 테스트를 통과하는 가장 간단한 코드를 작성한다. 일단 테스트 통과하는 코드를 작성하고 상황에 맞게 리팩토링하는 과정을 거치는 것이다. 말 그대로 테스트가 코드 작성을 주도하는 개발방식인 것이다.

### Add a test

테스트 주도형 개발에선, 새로운 기능을 추가하기 전 테스트를 먼저 작성한다. 테스트를 작성하기 위해서, 개발자는 해당 기능의 요구사항과 명세를 분명히 이해하고 있어야 한다. 이는 사용자 케이스와 사용자 스토리 등으로 이해할 수 있으며, 이는 개발자가 코드를 작성하기 전에 보다 요구사항에 집중할 수 있도록 도와준다. 이는 정말 중요한 부분이자 테스트 주도 개발이 주는 이점이라고 볼 수 있다.

### Run all tests and see if new one fails

어떤 새로운 기능을 추가하면 잘 작동하던 기능이 제대로 작동하지 않는 경우가 발생할 수 있다. 더 위험한 경우는 개발자가 이를 미처 인지하지 못하는 경우이다. 이러한 경우를 방지하기 위해 테스트 코드를 작성하는 것이다. 새로운 기능을 추가할 때 테스트 코드를 작성함으로써, 새로운 기능이 제대로 작동함과 동시에 기존의 기능들이 잘 작동하는지 테스트를 통해 확인할 수 있는 것이다.

### Refactor code

'좋은 코드'를 작성하기란 정말 쉽지가 않다. 코드를 작성할 때 고려해야 할 요소가 한 두 가지가 아니기 때문이다. 가독성이 좋게 coding convention 을 맞춰야 하며, 네이밍 규칙을 적용하여 메소드명, 변수명, 클래스명에 일관성을 줘야하며, 앞으로의 확장성 또한 고려해야 한다. 이와 동시에 비즈니스 로직에 대한 고려도 반드시 필요하며, 예외처리 부분 역시 빠뜨릴 수 없다. 물론 코드량이 적을 때는 이런 저런 것들을 모두 신경쓰면서 코드를 작성할 수 있지만 끊임없이 발견되는 버그들을 디버깅하는 과정에서 코드가 더럽혀지기 마련이다.

이러한 이유로 코드량이 방대해지면서 리팩토링을 하게 된다. 이 때 테스트 주도 개발을 통해 개발을 해왔다면, 테스트 코드가 그 중심을 잡아줄 수 있다. 뚱뚱해진 함수를 여러 함수로 나누는 과정에서 해당 기능이 오작동을 일으킬 수 있지만 간단히 테스트를 돌려봄으로써 이에 대한 안심을 하고 계속해서 리팩토링을 진행할 수 있다. 결과적으로 리팩토링 속도도 빨라지고 코드의 퀄리티도 그만큼 향상하게 되는 것이다. 코드 퀄리티 부분을 조금 상세히 들어가보면, 보다 객체지향적이고 확장 가능이 용이한 코드, 재설계의 시간을 단축시킬 수 있는 코드, 디버깅 시간이 단축되는 코드가 TDD 와 함께 탄생하는 것이다.

어차피 코드를 작성하고나서 제대로 작동하는지 판단해야하는 시점이 온다. 물론 중간 중간 수동으로 확인도 할 것이다. 또 테스트에 대한 부분에 대한 문서도 만들어야 한다. 그 부분을 자동으로 해주면서, 코드 작성에 도움을 주는 것이 TDD 인 것이다. 끊임없이 TDD 찬양에 대한 말만 했다. TDD 를 처음 들어보는 사람은 이 좋은 것을 왜 안하는가에 대한 의문이 들 수도 있다.

### 의문점들

#### Q. 코드 생산성에 문제가 있지는 않나?

두 배는 아니더라도 분명 코드량이 늘어난다. 비즈니스 로직, 각종 코드 디자인에도 시간이 많이 소요되는데, 거기에다가 테스트 코드까지 작성하기란 여간 벅찬 일이 아닐 것이다. 코드 퀄리티보다는 빠른 생산성이 요구되는 시점에서 TDD 는 큰 걸림돌이 될 수 있다.

#### Q. 테스트 코드를 작성하기가 쉬운가?

이 또한 TDD 라는 개발 방식을 적용하기에 큰 걸림돌이 된다. 진입 장벽이 존재한다는 것이다. 어떠한 부분을 테스트해야할 지, 어떻게 테스트해야할 지, 여러 테스트 프레임워크 중 어떤 것이 우리의 서비스와 맞는지 등 여러 부분들에 대한 학습이 필요하고 익숙해지는데에도 시간이 걸린다. 팀에서 한 명만 익숙해진다고 해결될 일이 아니다. 개발은 팀 단위로 수행되기 때문에 팀원 전체의 동의가 필요하고 팀원 전체가 익숙해져야 비로소 테스트 코드가 빛을 발하게 되는 것이다.

#### Q. 모든 상황에 대해서 테스트 코드를 작성할 수 있는가? 작성해야 하는가?

세상에는 다양한 사용자가 존재하며, 생각지도 못한 예외 케이스가 존재할 수 있다. 만약 테스트를 반드시 해봐야 하는 부분에 있어서 테스트 코드를 작성하는데 어려움이 발생한다면? 이러한 상황에서 주객이 전도하는 상황이 발생할 수 있다. 분명 실제 코드가 더 중심이 되어야 하는데 테스트를 위해서 코드의 구조를 바꿔야 하나하는 고민이 생긴다. 또한 발생할 수 있는 상황에 대한 테스트 코드를 작성하기 위해 배보다 배꼽이 더 커지는 경우가 허다하다. 실제 구현 코드보다 방대해진 코드를 관리하는 것도 쉽지만은 않은 일이 된 것이다.

모든 코드에 대해서 테스트 코드를 작성할 수 없으며 작성할 필요도 없다. 또한 테스트 코드를 작성한다고 해서 버그가 발생하지 않는 것도 아니다. 애초에 TDD 는 100% coverage 와 100% 무결성을 주장하지 않았다.

#### Personal Recommendation

* (도서) [켄트 벡 - 테스트 주도 개발](http://www.yes24.com/24/Goods/12246033)

##### Reference

* [TDD 에 대한 토론 - slipp](https://slipp.net/questions/16)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-1-1-development-common-sense)

</br>

## 함수형 프로그래밍

_아직 저도 잘 모르는 부분이라서 정말 간단한 내용만 정리하고 관련 링크를 첨부합니다._
함수형 프로그래밍의 가장 큰 특징 두 가지는 `immutable data`와 `first class citizen으로서의 function`이다.

### immutable vs mutable

우선 `immutable`과 `mutable`의 차이에 대해서 이해를 하고 있어야 한다. `immutable`이란 말 그대로 변경 불가능함을 의미한다. `immutable` 객체는 객체가 가지고 있는 값을 변경할 수 없는 객체를 의미하여 값이 변경될 경우, 새로운 객체를 생성하고 변경된 값을 주입하여 반환해야 한다. 이와는 달리, `mutable` 객체는 해당 객체의 값이 변경될 경우 값을 변경한다.

### first-class citizen

함수형 프로그래밍 패러다임을 따르고 있는 언어에서의 `함수(function)`는 `일급 객체(first class citizen)`로 간주된다. 일급 객체라 함은 다음과 같다.

* 변수나 데이터 구조안에 함수를 담을 수 있어서 함수의 파라미터로 전달할 수 있고, 함수의 반환값으로 사용할 수 있다.
* 할당에 사용된 이름과 관계없이 고유한 구별이 가능하다.
* 함수를 리터럴로 바로 정의할 수 있다.

### Reactive Programming

반응형 프로그래밍(Reactive Programming)은 선언형 프로그래밍(declarative programming)이라고도 불리며, 명령형 프로그래밍(imperative programming)의 반대말이다. 또 함수형 프로그래밍 패러다임을 활용하는 것을 말한다. 반응형 프로그래밍은 기본적으로 모든 것을 스트림(stream)으로 본다. 스트림이란 값들의 집합으로 볼 수 있으며 제공되는 함수형 메소드를 통해 데이터를 immutable 하게 관리할 수 있다.

#### Reference

* [함수형 프로그래밍 소개](https://medium.com/@jooyunghan/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%86%8C%EA%B0%9C-5998a3d66377)
* [반응형 프로그래밍이란 무엇인가](https://brunch.co.kr/@yudong/33)
* [What-I-Learned-About-RP](https://github.com/CoderK/What-I-Learned-About-RP)
* [Reactive Programming](http://sculove.github.io/blog/2016/06/22/Reactive-Programming)
* [MS 는 ReactiveX 를 왜 만들었을까?](http://huns.me/development/2051)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-1-1-development-common-sense)

</br>

## MVC 패턴이란 무엇인가?

그림과 함께 설명하는 것이 더 좋다고 판단하여 [포스팅](http://asfirstalways.tistory.com/180)으로 대체한다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-1-1-development-common-sense)

</br>

## Git 과 GitHub 에 대해서

Git 이란 VCS(Version Control System)에 대해서 기본적인 이해를 요구하고 있다.

* [Git 을 조금 더 알아보자 slide share](https://www.slideshare.net/ky200223/git-89251791)

Git 을 사용하기 위한 각종 전략(strategy)들이 존재한다. 해당 전략들에 대한 이해를 기반으로 Git 을 사용해야 하기 때문에 면접에서 자주 물어본다. 주로 사용되는 strategy 중심으로 질문이 들어오며 유명한 세 가지를 비교한 글을 첨부한다.

* [Gitflow vs GitHub flow vs GitLab flow](https://ujuc.github.io/2015/12/16/git-flow-github-flow-gitlab-flow/)

많은 회사들이 GitHub 을 기반으로 협업을 하게 되는데, (BitBucket 이라는 훌륭한 도구도 존재합니다.) GitHub 에서 어떤 일을 할 수 있는지, 어떻게 GitHub Repository 에 기여를 하는지 정리한 글을 첨부한다.

* [오픈소스 프로젝트에 컨트리뷰트 하기](http://guruble.com/%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EC%BB%A8%ED%8A%B8%EB%A6%AC%EB%B7%B0%ED%84%B0%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%90%98%EB%8A%94-%EA%B2%83/)
* [GitHub Cheetsheet](https://github.com/tiimgreen/github-cheat-sheet)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-1-1-development-common-sense)

</br>

</br>

_Development_common_sense.end_
