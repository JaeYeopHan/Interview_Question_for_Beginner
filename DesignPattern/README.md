# Part 1-6 Design Pattern

* [Singleton](#singleton)

[뒤로](https://github.com/JaeYeopHan/for_beginner)

</br>

## Singleton

### 필요성

`Singleton pattern(싱글턴 패턴)`이란 애플리케이션에서 인스턴스를 하나만 만들어 사용하기 위한 패턴이다. 커넥션 풀, 스레드 풀, 디바이스 설정 객체 등의 경우, 인스턴스를 여러 개 만들게 되면 자원을 낭비하게 되거나 버그를 발생시킬 수 있으므로 오직 하나만 생성하고 그 인스턴스를 사용하도록 하는 것이 이 패턴의 목적이다.

### 구현

하나의 인스턴스만을 유지하기 위해 인스턴스 생성에 특별한 제약을 걸어둬야 한다. new 를 실행할 수 없도록 생성자에 private 접근 제어자를 지정하고, 유일한 단일 객체를 반환할 수 있도록 정적 메소드를 지원해야 한다. 또한 유일한 단일 객체를 참조할 정적 참조변수가 필요하다.

```java
public class Singleton {
    private static Singleton singletonObject;

    private Singleton() {}

    public static Singleton getInstance() {
        if (singletonObject == null) {
            singletonObject = new Singleton();
        }
        return singletonObject;
    }
}
```

이 코드는 정말 위험하다. 멀티스레딩 환경에서 싱글턴 패턴을 적용하다보면 문제가 발생할 수 있다. 동시에 접근하다가 하나만 생성되어야 하는 인스턴스가 두 개 생성될 수 있는 것이다. 그렇게 때문에 `getInstance()` 메소드를 동기화시켜야 멀티스레드 환경에서의 문제가 해결된다.

```java
public class Singleton {
    private static Singleton singletonObject;

    private Singleton() {}

    public static synchronized Singleton getInstance() {
        if (singletonObject == null) {
            singletonObject = new Singleton();
        }
        return singletonObject;
    }
}
```

`synchronized` 키워드를 사용하게 되면 성능상에 문제점이 존재한다. 좀 더 효율적으로 제어할 수는 없을까?

```java
public class Singleton {
    private static volatile Singleton singletonObject;

    private Singleton() {}

    public static Singleton getInstance() {
        if (singletonObject == null) {
            synchronized (Singleton.class) {
                if(singletonObject == null) {
                    singletonObject = new Singleton();
                }
            }
        }
        return singletonObject;
    }
}
```

`DCL(Double Checking Locking)`을 써서 `getInstance()`에서 **동기화 되는 영역을 줄일 수 있다.** 초기에 객체를 생성하지 않으면서도 동기화하는 부분을 작게 만들었다. 그러나 이 코드는 **멀티코어 환경에서 동작할 때,** 하나의 CPU 를 제외하고는 다른 CPU 가 lock 이 걸리게 된다. 그렇기 때문에 다른 방법이 필요하다.

```java
public class Singleton {
    private static volatile Singleton singletonObject = new Singleton();

    private Singleton() {}

    public static Singleton getSingletonObject() {
        return singletonObject;
    }
}
```

클래스가 로딩되는 시점에 미리 객체를 생성해두고 그 객체를 반환한다.

_cf) `volatile` : 컴파일러가 특정 변수에 대해 옵티마이져가 캐싱을 적용하지 못하도록 하는 키워드이다._

#### Reference

* http://asfirstalways.tistory.com/335

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-1-6-design-pattern)

</br>

</br>

_Design pattern.end_
