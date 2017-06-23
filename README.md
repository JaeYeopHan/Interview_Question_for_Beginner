# Beginner_for_interview
예비 개발자들의 기술 면접 준비를 위한 자료를 정리해놓은 Repository입니다. 공부할 것이 정말 많은 개발이라는 분야를 모두 담지는 못했습니다. 그저 가이드라인으로 참고해주시면 감사하겠습니다. 제가 개인적으로 면접을 준비하면서 정리한 내용이라 잘못된 부분이 있을 수 있습니다. 이런 부분들에 대해서는 `Pull Request` or `Issue`로 참여해주시면 정말 감사하겠습니다. 또한 주제와 관련된 좋은 참고 자료를 추가하는 것도 가능합니다. 해당 Repository에서 학습을 하시다가 생기는 질문은 `Issue`에 올려주세요.  
> 취준생 여러분의 건승을 기원합니다 :)

[HOW TO CONTRIBUTE](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/issues/1)

</br>

</br>

---

</br>

## Algorithm [Link](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/Algorithm)
* 손코딩 및 코딩 테스트 대비  
=> 대부분의 내용이 코드이기 때문에 별도의 [Repository](https://github.com/JaeYeopHan/algorithm_basic_java)에 저장합니다.
* 코딩 테스트를 위한 Tip
* 문제 해결을 위한 전략적 접근
* Sorting Algorithm

</br>

---

# Part 1. 전산 기초

## 개발상식 [Link](https://github.com/JaeYeopHan/Beginner_for_interview/tree/master/Development_common_sense)
* 객체 지향 프로그래밍이란 무엇인가?
	* 객체 지향 개발 원칙은 무엇인가?
* RESTFul API란?
* TDD란 무엇이며 어떠한 장점이 있는가?
* 함수형 프로그래밍
* MVC 패턴이란 무엇인가?

</br>

## 자료구조  [Link](https://github.com/JaeYeopHan/for_beginner/tree/master/DataStructure)
* Array vs LinkedList
* Stack and Queue
* Tree
  * Binary Tree
  * Full Binary Tree
  * Complete Binary Tree
  * BST(Binary Search Tree)
* Binary Heap
* Red-Black Tree
  * 정의
  * 특징
  * 삽입
  * 삭제
* HashTable
  * hash function
  * Resolve Collision
    * Open Addressing
    * Separate Chaining
  * Resize
* Graph
  * Graph 용어 정리
  * Graph 구현
  * Graph 탐색
  * Minimum Spanning Tree
    * Kruskal algorithm
    * Prim algorithm

</br>

## 네트워크 [Link](https://github.com/JaeYeopHan/Beginner_for_interview/tree/master/Network)
* GET, POST 방식의 차이점
* TCP 3-way-handshake
* TCP와 UDP의 차이점
* HTTP와 HTTPS의 차이점
  * HTTP의 문제점들
* DNS round robin 방식
* 웹 통신의 큰 흐름

</br>

## 운영체제 [Link](https://github.com/JaeYeopHan/Beginner_for_interview/tree/master/OS)
* 프로세스와 스레드의 차이
* 스케줄러의 종류
  * 장기 스케줄러
  * 단기 스케줄러
  * 중기 스케줄러
* CPU 스케줄러
  * FCFS
  * SJF
  * SRT
  * Priority scheduling
  * RR
* 동기와 비동기의 차이
* 멀티스레드
  * 장점과 단점
* 캐시의 지역성
  * Locality
  * Caching line

</br>

## 데이터베이스 [Link](https://github.com/JaeYeopHan/Beginner_for_interview/tree/master/Database)
* 데이터베이스
  * 데이터베이스를 사용하는 이유
  * 데이터베이스 성능
* Index
  * Index란 무엇인가
  * Index의 자료구조
  * Primary index vs Secondary index
  * Composite index
  * Index의 성능과 고려해야할 사항
* 정규화에 대해서
  * 정규화 탄생 배경
  * 정규화란 무엇인가
  * 정규화의 종류
  * 정규화의 장단점
* Transaction
  * 트랜잭션(Transaction)이란 무엇인가?
  * 트랜잭션과 Lock
  * 트랜잭션의 특성
  * 트랜잭션을 사용할 때 주의할 점
* Statement vs PrepareStatement
* NoSQL
  * 정의
  * CAP 이론
    * 일관성
    * 가용성
    * 네트워크 분할 허용성
  * 저장방식에 따른 분류
    * Key-Value Model
    * Document Model
    * Column Model

</br>

## Design Pattern [Link](https://github.com/JaeYeopHan/Beginner_for_interview/tree/master/DesignPattern)
* Singleton

</br>

---

</br>

# Part 2. Language

## Java [Link](https://github.com/JaeYeopHan/Beginner_for_interview/tree/master/Java)
* JVM에 대해서 / GC의 원리
* Collection
* Annotation
* Generic
* final
* Overriding vs Overloading
* Access Modifier
* Wrapper class
* Multi-Thread 환경에서의 개발

#### 추가 자료
* [Java 기본서 비교](http://asfirstalways.tistory.com/146)


</br>

## JavaScript [Link](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/JavaScript)
* JavaScript Event Loop
* Hoisting
* Closure
* this에 대해서
* Array-Like Object
* Promise

#### 추가 자료
* [JavaScript 기본서 비교](http://asfirstalways.tistory.com/246)
* [ECMAScript6 정리](https://jaeyeophan.github.io/categories/ECMAScript6)

</br>

---

</br>

# Part 3. 분야별

## Front-End [Link](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/FrontEnd)
* 브라우저의 작동 원리
* 이벤트 버블링과 캡처링
* Event delegation(이벤트 위임)
* CORS
* 크로스 브라우징
* normalize.css vs reset.css
* CSS 방법론
* 웹 성능과 관련된 Issues

#### 추가 자료
* [Front-end-Developer-Interview-Questions (한국어)](https://github.com/h5bp/Front-end-Developer-Interview-Questions/tree/master/Translations/Korean)

</br>

---

</br>

### 그 외 좋은 자료
* [mission-peace/interview repository](https://github.com/mission-peace/interview)  
=> 각종 알고리즘에 대한 코드와 동영상 강의 링크를 제공합니다. (영어)
* [awesome-interview-questions](https://github.com/MaximAbramchuck/awesome-interview-questions)  
=> 각종 언어, CS 기초에 대한 interview 질문들이 정리되어 있습니다. (영어)
* [주니어 개발자를 위한 취업 정보](https://github.com/jojoldu/junior-recruit-scheduler)

</br>

---

</br>

## Contributor
