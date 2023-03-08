# Part 2-1 Java

- [Part 2-1 Java](#part-2-1-java)
  - [JVM 에 대해서, GC 의 원리](#jvm-%EC%97%90-%EB%8C%80%ED%95%B4%EC%84%9C-gc-%EC%9D%98-%EC%9B%90%EB%A6%AC)
  - [Collection](#collection)
  - [Annotation](#annotation)
      - [Reference](#reference)
  - [Generic](#generic)
  - [final keyword](#final-keyword)
  - [Overriding vs Overloading](#overriding-vs-overloading)
  - [Access Modifier](#access-modifier)
  - [Wrapper class](#wrapper-class)
    - [AutoBoxing](#autoboxing)
  - [Multi-Thread 환경에서의 개발](#multi-thread-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C%EC%9D%98-%EA%B0%9C%EB%B0%9C)
    - [Field member](#field-member)
    - [동기화(Synchronized)](#%EB%8F%99%EA%B8%B0%ED%99%94synchronized)
    - [ThreadLocal](#threadlocal)
      - [Personal Recommendation](#personal-recommendation)

[뒤로](https://github.com/JaeYeopHan/for_beginner)

</br>

## JVM 에 대해서, GC 의 원리

그림과 함께 설명해야 하는 부분이 많아 링크를 첨부합니다.

* [Java Virtual Machine 에 대해서](http://asfirstalways.tistory.com/158)
* [Garbage Collection 에 대해서](http://asfirstalways.tistory.com/159)
* [Java Garbage Collection - 네이버 D2](https://d2.naver.com/helloworld/1329)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-java)

</br>

## Collection

Java Collection 에는 `List`, `Map`, `Set` 인터페이스를 기준으로 여러 구현체가 존재한다. 이에 더해 `Stack`과 `Queue` 인터페이스도 존재한다. 왜 이러한 Collection 을 사용하는 것일까? 그 이유는 다수의 Data 를 다루는데 표준화된 클래스들을 제공해주기 때문에 DataStructure 를 직접 구현하지 않고 편하게 사용할 수 있기 때문이다. 또한 배열과 다르게 객체를 보관하기 위한 공간을 미리 정하지 않아도 되므로, 상황에 따라 객체의 수를 동적으로 정할 수 있다. 이는 프로그램의 공간적인 효율성 또한 높여준다.

* List  
  `List` 인터페이스를 직접 `@Override`를 통해 사용자가 정의하여 사용할 수도 있으며, 대표적인 구현체로는 `ArrayList`가 존재한다. 이는 기존에 있었던 `Vector`를 개선한 것이다. 이외에도 `LinkedList` 등의 구현체가 있다.
* Map  
  대표적인 구현체로 `HashMap`이 존재한다. (밑에서 살펴볼 멀티스레드 환경에서의 개발 부분에서 HashTable 과의 차이점에 대해 살펴본다.) key-value 의 구조로 이루어져 있으며 Map 에 대한 구체적인 내용은 DataStructure 부분의 hashtable 과 일치한다. key 를 기준으로 중복된 값을 저장하지 않으며 순서를 보장하지 않는다. key 에 대해서 순서를 보장하기 위해서는 `LinkedHashMap`을 사용한다.
* Set  
  대표적인 구현체로 `HashSet`이 존재한다. `value`에 대해서 중복된 값을 저장하지 않는다. 사실 Set 자료구조는 Map 의 key-value 구조에서 key 대신에 value 가 들어가 value 를 key 로 하는 자료구조일 뿐이다. 마찬가지로 순서를 보장하지 않으며 순서를 보장해주기 위해서는 `LinkedHashSet`을 사용한다.
* Stack 과 Queue  
  `Stack` 객체는 직접 `new` 키워드로 사용할 수 있으며, `Queue` 인터페이스는 JDK 1.5 부터 `LinkedList`에 `new` 키워드를 적용하여 사용할 수 있다. 자세한 부분은 DataStructure 부분의 설명을 참고하면 된다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-java)

</br>

## Annotation

어노테이션이란 본래 주석이란 뜻으로, 인터페이스를 기반으로 한 문법이다. 주석과는 그 역할이 다르지만 주석처럼 코드에 달아 클래스에 특별한 의미를 부여하거나 기능을 주입할 수 있다. 또 해석되는 시점을 정할 수도 있다.(Retention Policy) 어노테이션에는 크게 세 가지 종류가 존재한다. JDK 에 내장되어 있는 `built-in annotation`과 어노테이션에 대한 정보를 나타내기 위한 어노테이션인 `Meta annotation` 그리고 개발자가 직접 만들어 내는 `Custom Annotation`이 있다. built-in annotation 은 상속받아서 메소드를 오버라이드 할 때 나타나는 @Override 어노테이션이 그 대표적인 예이다. 어노테이션의 동작 대상을 결정하는 Meta-Annotation 에도 여러 가지가 존재한다.

#### Reference

* http://asfirstalways.tistory.com/309

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-java)

</br>

## Generic

제네릭은 자바에서 안정성을 맡고 있다고 할 수 있다. 다양한 타입의 객체들을 다루는 메서드나 컬렉션 클래스에서 사용하는 것으로, 컴파일 과정에서 타입체크를 해주는 기능이다. 객체의 타입을 컴파일 시에 체크하기 때문에 객체의 타입 안전성을 높이고 형변환의 번거로움을 줄여준다. 자연스럽게 코드도 더 간결해진다. 예를 들면, Collection 에 특정 객체만 추가될 수 있도록, 또는 특정한 클래스의 특징을 갖고 있는 경우에만 추가될 수 있도록 하는 것이 제네릭이다. 이로 인한 장점은 collection 내부에서 들어온 값이 내가 원하는 값인지 별도의 로직처리를 구현할 필요가 없어진다. 또한 api 를 설계하는데 있어서 보다 명확한 의사전달이 가능해진다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-java)

</br>

## final keyword

* final class  
  다른 클래스에서 상속하지 못한다.

* final method  
  다른 메소드에서 오버라이딩하지 못한다.

* final variable  
  변하지 않는 상수값이 되어 새로 할당할 수 없는 변수가 된다.

추가적으로 혼동할 수 있는 두 가지를 추가해봤다.

* finally  
  `try-catch` or `try-catch-resource` 구문을 사용할 때, 정상적으로 작업을 한 경우와 에러가 발생했을 경우를 포함하여 마무리 해줘야하는 작업이 존재하는 경우에 해당하는 코드를 작성해주는 코드 블록이다.

* finalize()  
  keyword 도 아니고 code block 도 아닌 메소드이다. `GC`에 의해 호출되는 함수로 절대 호출해서는 안 되는 함수이다. `Object` 클래스에 정의되어 있으며 GC 가 발생하는 시점이 불분명하기 때문에 해당 메소드가 실행된다는 보장이 없다. 또한 `finalize()` 메소드가 오버라이딩 되어 있으면 GC 가 이루어질 때 바로 Garbage Collecting 되지 않는다. GC 가 지연되면서 OOME(Out of Memory Exception)이 발생할 수 있다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-java)

</br>

## Overriding vs Overloading

둘 다 다형성을 높여주는 개념이고 비슷한 이름이지만, 전혀 다른 개념이라고 봐도 무방할 만큼 차이가 있다(오버로딩은 다른 시그니쳐를 만든다는 관점에서 다형성으로 보지 않는 의견도 있다). 공통점으로는 같은 이름의 다른 함수를 호출한다는 것이다. 

* 오버라이딩(Overriding)  
  상위 클래스 혹은 인터페이스에 존재하는 메소드를 하위 클래스에서 필요에 맞게 재정의하는 것을 의미한다. 자바의 경우는 오버라이딩 시 동적바인딩된다.

  예)<br>
  아래와 같은 경우, SuperClass의 fun이라는 인터페이스를 통해 SubClass의 fun이 실행된다.
  ```java
  SuperClass object = new SubClass();
  object.fun();
  ```

* 오버로딩(Overloading)
  메소드의 이름은 같다. return 타입은 동일하거나 다를 수 있지만, return 타입만 다를 수는 없다. 매개변수의 타입이나 갯수가 다른 메소드를 만드는 것을 의미한다. 다양한 상황에서 메소드가 호출될 수 있도록 한다. 언어마다 다르지만, 자바의경우 오버로딩은 다른 시그니쳐를 만드는 것으로, 아예 다른함수를 만든것과 비슷하다고 생각하면 된다. 시그니쳐가 다르므로 정적바인딩으로 처리 가능하며, 자바의 경우 정적으로 바인딩된다.

  예)<br>
  아래와 같은 경우,fun(SuperClass super)이 실행된다.
  ```java
  main(blabla) {
    SuperClass object = new SubClass();
    fun(object);
  }
  
  fun(SuperClass super) {
    blabla....
  }

  fun(SubClass sub) {
    blabla....
  }
  ```

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-java)

</br>

## Access Modifier

변수 또는 메소드의 접근 범위를 설정해주기 위해서 사용하는 Java 의 예약어를 의미하며 총 네 가지 종류가 존재한다.

* public  
  어떤 클래스에서라도 접근이 가능하다.

* protected  
  클래스가 정의되어 있는 해당 패키지 내 그리고 해당 클래스를 상속받은 외부 패키지의 클래스에서 접근이 가능하다.

* (default)  
  클래스가 정의되어 있는 해당 패키지 내에서만 접근이 가능하도록 접근 범위를 제한한다.

* private  
  정의된 해당 클래스에서만 접근이 가능하도록 접근 범위를 제한한다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-java)

</br>

## Wrapper class

기본 자료형(Primitive data type)에 대한 클래스 표현을 Wrapper class 라고 한다. `Integer`, `Float`, `Boolean` 등이 Wrapper class 의 예이다. int 를 Integer 라는 객체로 감싸서 저장해야 하는 이유가 있을까? 일단 컬렉션에서 제네릭을 사용하기 위해서는 Wrapper class 를 사용해줘야 한다. 또한 `null` 값을 반환해야만 하는 경우에는 return type 을 Wrapper class 로 지정하여 `null`을 반환하도록 할 수 있다. 하지만 이러한 상황을 제외하고 일반적인 상황에서 Wrapper class 를 사용해야 하는 이유는 객체지향적인 프로그래밍을 위한 프로그래밍이 아니고서야 없다. 일단 해당 값을 비교할 때, Primitive data type 인 경우에는 `==`로 바로 비교해줄 수 있다. 하지만 Wrapper class 인 경우에는 `.intValue()` 메소드를 통해 해당 Wrapper class 의 값을 가져와 비교해줘야 한다.

### AutoBoxing

JDK 1.5 부터는 `AutoBoxing`과 `AutoUnBoxing`을 제공한다. 이 기능은 각 Wrapper class 에 상응하는 Primitive data type 일 경우에만 가능하다.

```java
List<Integer> lists = new ArrayList<>();
lists.add(1);
```

우린 `Integer`라는 Wrapper class 로 설정한 collection 에 데이터를 add 할 때 Integer 객체로 감싸서 넣지 않는다. 자바 내부에서 `AutoBoxing`해주기 때문이다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-java)

</br>

## Multi-Thread 환경에서의 개발

개발을 시작하는 입장에서 멀티 스레드를 고려한 프로그램을 작성할 일이 별로 없고 실제로 부딪히기 힘든 문제이기 때문에 많은 입문자들이 잘 모르고 있는 부분 중 하나라고 생각한다. 하지만 이 부분은 정말 중요하며 고려하지 않았을 경우 엄청난 버그를 양산할 수 있기 때문에 정말 중요하다.

### Field member

`필드(field)`란 클래스에 변수를 정의하는 공간을 의미한다. 이곳에 변수를 만들어두면 메소드 끼리 변수를 주고 받는 데 있어서 참조하기 쉬우므로 정말 편리한 공간 중 하나이다. 하지만 객체가 여러 스레드가 접근하는 싱글톤 객체라면 field 에서 상태값을 갖고 있으면 안된다. 모든 변수를 parameter 로 넘겨받고 return 하는 방식으로 코드를 구성해야 한다.

</br>

### 동기화(Synchronized)

`synchronized` 키워드를 직접 사용해서 특정 메소드나 구간에 Lock을 걸어 스레드 간 상호 배제를 구현할 수 있는 이 때 메서드에 직접 걸 수 도 있으며 블록으로 구간을 직접 지정해줄 수 있다.
메서드에 직접 걸어줄 경우에는 해당 class 인스턴스에 대해 Lock을 걸고 synchronized 블록을 이용할 경우에는 블록으로 감싸진 구간만 Lock이 걸린다. 때문에 Lock을 걸 때에는
이 개념에 대해 충분히 고민해보고 적절하게 사용해야만 한다.

그렇다면 필드에 Collection 이 불가피하게 필요할 때는 어떠한 방법을 사용할까? `synchronized` 키워드를 기반으로 구현된 Collection 들도 많이 존재한다. `List`를 대신하여 `Vector`를 사용할 수 있고, `Map`을 대신하여 `HashTable`을 사용할 수 있다. 하지만 이 Collection 들은 제공하는 API 가 적고 성능도 좋지 않다.

기본적으로는 `Collections`라는 util 클래스에서 제공되는 static 메소드를 통해 이를 해결할 수 있다. `Collections.synchronizedList()`, `Collections.synchronizedSet()`, `Collections.synchronizedMap()` 등이 존재한다.
JDK 1.7 부터는 `concurrent package`를 통해 `ConcurrentHashMap`이라는 구현체를 제공한다. Collections util 을 사용하는 것보다 `synchronized` 키워드가 적용된 범위가 좁아서 보다 좋은 성능을 낼 수 있는 자료구조이다.

</br>

### ThreadLocal

스레드 사이에 간섭이 없어야 하는 데이터에 사용한다. 멀티스레드 환경에서는 클래스의 필드에 멤버를 추가할 수 없고 매개변수로 넘겨받아야 하기 때문이다. 즉, 스레드 내부의 싱글톤을 사용하기 위해 사용한다. 주로 사용자 인증, 세션 정보, 트랜잭션 컨텍스트에 사용한다.

스레드 풀 환경에서 ThreadLocal 을 사용하는 경우 ThreadLocal 변수에 보관된 데이터의 사용이 끝나면 반드시 해당 데이터를 삭제해 주어야 한다. 그렇지 않을 경우 재사용되는 쓰레드가 올바르지 않은 데이터를 참조할 수 있다.

_ThreadLocal 을 사용하는 방법은 간단하다._

1.  ThreadLocal 객체를 생성한다.
2.  ThreadLocal.set() 메서드를 이용해서 현재 스레드의 로컬 변수에 값을 저장한다.
3.  ThreadLocal.get() 메서드를 이용해서 현재 스레드의 로컬 변수 값을 읽어온다.
4.  ThreadLocal.remove() 메서드를 이용해서 현재 스레드의 로컬 변수 값을 삭제한다.

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-java)

</br>

#### Personal Recommendation

* (도서) [Effective Java 2nd Edition](http://www.yes24.com/24/goods/14283616?scode=032&OzSrank=9)
* (도서) [스프링 입문을 위한 자바 객체 지향의 원리와 이해](http://www.yes24.com/24/Goods/17350624?Acode=101)

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-2-1-java)

</br>

</br>

_Java.end_
