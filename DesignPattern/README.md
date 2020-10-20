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

## MVC, MVP, MVVM
이 세가지 패턴에는 M(Model) - V(View)라는 공통점이있다. 결국에는 이 관계를 어떻게 처리하냐에 따라 패턴의 장단점이 나타난다.

### M(Model) - V(View)
모델이란 프로그램내에서 사용되는 데이터를 나타낸다. 데이터베이스, 상수, 변수 등을 가지고 있으며 로직에 따라 데이터의 정보가 달라진다.
뷰는 나타나는 화면이라고 생각하면 된다. 화면에 결과를 나타내기 위해 우리는 다양한 알고리즘 및 로직을 개발하고 개발된 로직에 따라 모델을 화면에 다양한 방법으로 표시한다. 그리고 이제 C(Controller), P(Presenter), VM(ViewModel)에대해 알아보자

### C(Controller)
컨트롤러에는 비지니스 로직들이 담겨있으며 MVC 패턴에서 사용자의 입력을 받아 로직들이 실행되고 실행된 결과를 뷰에 통보하여 데이터를 보여주게된다.
보통 컨트롤러는 여러 뷰를 알고있고 사용자에게 받은 입력에 따라 모델을 업데이트 하지만 뷰를 직접 업데이트 하지 않는다. 그래서 뷰는 모델을 직접 사용하여 업데이트를 진행하고 이에따라 뷰와 모델의 관게를 쉽게 분리할 수 없다는 단점이있다.

### P(Presenter)
프레젠터는 뷰와 1:1관계를 가지며 비지니스 로직이 들어가있다. MVC에서는 컨트롤러에서 사용자의 입력을 받지만 MVP는 뷰에서 사용자의 입력을 받고 이 입력을 프레젠터에 넘겨주어 로직에 따라 모델을 업데이트한다. 그리고 업데이트된 모델을 다시 뷰에게 넘겨주어 뷰를 업데이트한다.
뷰와 모델의 관계를 끊어냈지만 대신 뷰와 프레전터의 강한 의존 관계가 생성되며 앱이 커지거나 복잡해질수록 프레젠터가 거대해진다는 단점이있다.

### VM(ViewModel)
뷰모델은 뷰를 위한 모델이라고할 수 있다. MVVM은 뷰에서 입력을 받으며 이를 뷰모델에 알려준다. 그러면 뷰모델을 로직을 통해 모델을 업데이트한다.
그러면 뷰를 어떻게 업데이트하느냐인대 뷰는 뷰모델을 선택하여 선택된 뷰모델을 지켜보고있다. 그래서 모델에 업데이트가 일어나는 순간을 캐치해서 뷰도 같이 업데이트가 진행된다. 이를 데이터바인딩이라고 한다. 뷰와 모델에 관계를 완전히 끊어냈지만 처음 입문하기 어렵다는 단점이있다.

## 그외 알아두면 좋은 패턴
### Factory Pattern
객체의 생성을 위임하는 패턴

```java
class FactoryClass {
    public Animal newInstace(String name) {
        switch (name) {
            case "dog":
                return new Dog();
            case "cat":
                return new Cat();
            default:
                throw AccessDeniedException("unknown name");
        }
    }
}
```

### Strategy Pattern
행위를 클래스로 캡슐화해 동적으로 행위를 자유롭게 바꿀 수 있게 해주는 패턴

```java
// 공통으로 사용하는 행위 분리
public abstract class Move {
    String move();
}

// 공통 행위를 상속받아 구현
class Tiger extends Move {
    private String name;

    public Tiger(String name) {
        this.name = name;
    }

    public void doMove() {
        System.out.println(getName() + " " + move());
    }

    public String getName() {
        return name;
    }

    @Override
    public String move() {
        return "Fly";
    }
}

class Bird extends Move {
    private String name;

    public Bird(String name) {
        this.name = name;
    }

    public void doMove() {
        System.out.println(getName() + " " + move());
    }

    public String getName() {
        return name;
    }

    @Override
    public String move() {
        return "Walk";
    }
}
```

### Adapter Pattern
서로 호환이 되지 않는 클래스를 인터페이스를 통해 같은 방법으로 사용하는 패턴

```java
// 기존에 사용하던 엔진 클래스
public static void main(String[] args) {
    MyEngine engine = new MyEngine();

    engine.add(1);
    engine.add(2);
    engine.add(3);
    engine.printAll();
    engine.delete(1);
    engine.printAll();
    engine.print(1);
    engine.printAll();
}

// 다른 엔진 클래스를 기존과 같이 사용하려면 불필요한 변경이 필요
public static void main(String[] args) {
    AEngine aEngine = new AEngine();

    engine.add(1);
    engine.add(2);
    engine.add(3);
    for (int i = 0; i < engine.getSize(); i++) {
        engine.print(i);
    }
    System.out.println();
    engine.delete(1);
    for (int i = 0; i < engine.getSize(); i++) {
        engine.print(i);
    }
    System.out.println();
    engine.print(1);
    for (int i = 0; i < engine.getSize(); i++) {
        engine.print(i);
    }
    System.out.println();
}

// 서로의 기능을 통일 시키기위한 인터페이스
interface EngineInterface {
    public void print(int index);
    public void printAll();
    public void add(int data);
    public void delete(int index);
    public int getSize();
}

// 위 인터페이스를 구현하면서 새로운 엔진을 생성자로 받아 필요한 기능을 구현
class AdapterEngine implements EngineInterface {
    AEngine engine;

    public AdapterEngine(AEngine engine) {
        this.engine = engine;
    }

    @Override
    public void print(int index) {
        engine.print(index);
    }

    @Override
    public void printAll() {
        for (int i = 0; i < engine.getSize(); i++) {
            engine.print(i);
        }
        System.out.println();
    }

    @Override
    public void add(int data) {
        engine.add(data);
    }

    @Override
    public void delete(int index) {
        engine.delete(index);
    }

    @Override
    public int getSize() {
        return engine.getSize();
    }
}

// 결과적으로 최소한의 변경으로 같은 행위를 할 수 있음
public static void main(String [] args) {
    AEngine aEngine = new AEngine();
    EngineInterface engine = new AdapterEngine(aEngine);

    engine.add(1);
    engine.add(2);
    engine.add(3);
    engine.printAll();
    engine.delete(1);
    engine.printAll();
    engine.print(1);
    engine.printAll();
}
```

#### Reference

* http://asfirstalways.tistory.com/335
* https://gmlwjd9405.github.io/2018/07/06/strategy-pattern.html

[뒤로](https://github.com/JaeYeopHan/for_beginner)/[위로](#part-1-6-design-pattern)

</br>

</br>

_Design pattern.end_
