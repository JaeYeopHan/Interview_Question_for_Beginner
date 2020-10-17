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

이 코드는 정말 위험하다. 멀티스레딩 환경에서 싱글턴 패턴을 적용하다보면 문제가 발생할 수 있다. 동시에 접근하다가 하나만 생성되어야 하는 인스턴스가 두 개 생성될 수 있는 것이다. 그렇게 때문에 `getSingletonObject()` 메소드를 동기화시켜야 멀티스레드 환경에서의 문제가 해결된다.

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

static 변수는 인스턴스 생성없이 클래스의 이름을 사용하여 바로 접근할 수 있다는 장점을 가지고 있다. 그렇기 때문에 프로그램 시작과 함께 메모리상에 올라가게 되는데 이 때 CPU 부하를 줄이기 위해 `Lazy Initialization`을 사용하기도한다.

```java
public class Singleton {
    private static Singleton singletonObject = null;

    private Singleton() {}

    public static Singleton getSingletonObject() {
        if (singletonObject == null) {
            singletonObject = new Singleton();
        }
        return singletonObject;
    }
}
```

지금까지 소개한 방법들은 모두 멀티 스레드 환경에서의 위험성을 가지고 있다. 멀티 스레드 환경에서도 하나의 인스턴스만을 가지고 있다는것을 보장하기 위해 다음과 같은 방법으로 사용한다.

```java
class SingleObject {
    private SingleObject() {
    }

    private static class Singleton {
        private static final SingleObject instance = new SingleObject();
    }

    public static SingleObject getInstance() {
        return Singleton.instance;
    }
}
```

위 클래스는 Lazy Initialization이고, 내부에 있는 static class가 처음에 호출될 때 한번만 초기화 된다. 또한 아래와 같이 `Enum`을 생성해 멀티 스레드에 안전한 싱글톤을 사용하기도한다.

```java
enum SingleObject {
    INSTANCE;

    public static SingleObject getInstance() {
        return INSTANCE;
    }
}
```

하지만 이 방법도 문제가 없는것은 아니다. 다른 방법으로 싱글톤의 인스턴스를 마음대로 생성할 수 있기 때문이다.

```java
class UsingReflectionToDestroySingleton {
    public static void main(String[] args) {
        SingleObject instance = SingleObject.getInstance();
        SingleObject instance2 = null;

        try {
            Constructor[] constructors = SingleObject.class.getDeclaredConstructors();
            for (Constructor constructor : constructors) {
                constructor.setAccessible(true);
                instance2 = (SingleObject) constructor.newInstance();
            }
        } catch (Exception e) {

        }

        System.out.println(instance.hashCode());
        System.out.println(instance2.hashCode());

    }
}
```

위 코드를 실행하면 서로 다른 메모리값을 가지고 있는 싱글톤이 생성된걸 볼 수 있다. 위 방법은 리플렉션을 사용하여 생성자를 호출하는 방식인데 생성자를 호출하면 throw를 날리는 방법으로 막을 수 있다.

```java
private SingletonObject() {
    throw AccessDeniedException("Access Denied Exception")
}
```

#### Reference

* http://asfirstalways.tistory.com/335

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-1-6-design-pattern)

</br>

</br>

_Design pattern.end_
