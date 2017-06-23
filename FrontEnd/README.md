# Part 3-1 Front-End
* [브라우저의 동작 원리](#브라우저의-동작-원리)
* 이벤트 버블링과 캡처링
* Event delegation(이벤트 위임)이란 무엇인가
* [CORS](#cors)
* 크로스 브라우징
* normalize.css vs reset.css
* CSS 방법론
* 웹 성능과 관련된 Issues

[뒤로](https://github.com/JaeYeopHan/for_beginner)

## 브라우저의 동작 원리
1. HTML 마크업을 처리하고 DOM 트리를 빌드한다. ("무엇을" 그릴지 결정한다.)
2. CSS 마크업을 처리하고 CSSOM 트리를 빌드한다. ("어떻게" 그릴지 결정한다.)
3. DOM 및 CSSOM을 결합하여 렌더링 트리를 형성한다. ("화면에 그려질 것만" 결정)
4. 렌더링 트리에서 레이아웃을 실행하여 각 노드의 기하학적 형태를 계산한다. ("Box-Model"을 생성한다.)
5. 개별 노드를 화면에 페인트한다.(or 래스터화)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-3-1-front-end)

</br>

## CORS
기본적으로 자바스크립트는 Same-Origin-Policy 을 따르고 있다. **동일 근원 정책** 이라고 하며 타 도메인간 통신이 불가능한 것을 말한다. 이 때, 프로토콜도 같아야 하고, 포트도 같아야 한다. (이 때, 서브 도메인 네임은 상관없다.) 이러한 문제를 해결하기 위해 과거에는 flash를 proxy로 두고 타 도메인간 통신을 했다.

하지만 모바일 운영체제의 등장으로 flash로 힘들어졌다. (iOS는 전혀 플래시를 지원하지 않는다.) 대체제로 나온 기술이 `JSONP`이다. `JSONP`에는 타 도메인간 자원을 공유할 수 있는 몇 가지 태그가 존재한다. 예를들어 `img`, `iframe`, `anchor`, `script`, `link` 등등이 존재한다. 스크립트도 외부에 있는 자원을 가져올 수 있다.

여기서 CORS는 다른 도메인간에 자원을 공유할 수 있게 해주는 것이다.
Cross-Origin Resource Sharing

최근에는 XHR2의 경우 타 도메인간 통신이 가능해졌다. 이럴 경우 보안 상에는 문제가 없을지 고민해봐야 한다. 아무나 다 요청을 보내면 서버는 모두 응답을 줘야 하나?

(작성중...)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-3-1-front-end)

</br>

</br>

_Front-End.end_  
