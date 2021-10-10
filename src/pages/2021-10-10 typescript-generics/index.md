---
path: "/blog/typescript-generics"
date: "2021-10-10"
title: "TypeScript - Generics"
readTime: "10"
author: "Adam Knieć"
description: "Wprowadzenie do typów generycznych (Generics) w TypeScript."
tags: ["TypeScript"]
---

## Założenia wstępne

W poprzednim wpisie poruszyliśmy podstawy TypeScripta. Jeśli trafiłeś tutaj i czujesz podświadomie, że warto sobie kilka kwestii powtórzyć zanim zabierzesz się za Generyki to zachęcam do przeczytania <a href="https://bolimnieweb.pl/blog/typescript-podstawy" target="_blank">pierwszego wpisu</a>. Znajdziesz w nim obszerne wprowadzenie, które zdecydowanie może Ci się przydać.

Syntax i podstawy musisz znać :).

## Po co nam typy generyczne (Generics) ?

Ogólne założenia podczas tworzenia nowego oprogramowania są takie, że dążymy do kodu, który będzie skalowalny, utrzymywalny i w miarę możliwości **reużywalny**.

Jak to się ma do TypeScript-a ? 

Rozważmy poniższą funkcję.

```typescript
function logIt(param:number):number {
  console.log(param);
  return param;
};

logIt(5); // 5
```

Powyższy snippet przedstawia funkcję, która przyjmuje parametr typu `number` i zwraca wartość typu `number`. W bloku funkcji nie dzieje się zbyt wiele. Jedyne co robimy to logujemy wartość przekazaną w parametrze i zwracamy ją. Funkcja działa poprawnie i w konsoli wylogowana zostaje liczba 5 (jako number 🙂).

Świetnie. Po jakimś czasie pracując nad kolejnym zadaniem zwracamy uwagę, że przydałaby nam się analogiczna funkcja ale potrafiąca operować również na `stringach`.
Funkcja `logIt` wygląda jak dobry kandydat do tego zadania.

```typescript
logIt('Test String');
```

Niezła próba i nasz techniczny zmysł zadziałał w miarę dobrze. Funkcja `logIt` jest prawie tym czego potrzebujemy. Dlaczego prawie?

`BugFinder: Argument of type '"Test String"' is not assignable to parameter of type 'number'.`

No tak - to ma sens. Przecież jawnie określiliśmy oczekiwany typ wejścia i wyjścia w funcji `logIt`. Jest nim `number`. W tej chwili nas interesuje typ `string`. Co zrobić z tym problemem? 

Może `any` załatwi sprawę?

```typescript
function logIt(any):any {
  console.log(param);
  return param;
};

logIt("Test String"); // Test String

```

TypeScript jest zadowolony. Problem polega na tym, że typ any jest troche jak piwo bezalkoholowe. Niby smakuje dobrze ale coś jest k*rwa nie tak... 
Z poprzedniego wpisu o TypeScripcie wiemy już, że `any` jest ostatecznością i na ogół nie powinno się z tego typu korzystać. Przez niego tracimy kontrolę i narażamy nasze funkcjonalności na błędy.

Myślimy dalej...

Może zadeklarować bliźniaczą funkcję, która operuje na innym typie danych? Zapewne już się domyślasz, że nie byłoby to idealne rozwiązanie. Ta funkcja aż się prosi o o stworzenie czegoś bardziej reużywalnego, odpornego i skalowalnego. Innymi słowy - czegoś bardziej **generycznego.**

## Typy generyczne w akcji

W jaki sposób "generyki" są w stanie nam pomóc z powyższym problemem? Przeanalizujmy  przykładowe rozwiązanie.

```typescript
function logItGeneric<T>(param: T): T{
  console.log(param);
  return param;
}

logItGeneric<String>("Adam"); // Adam
logItGeneric<Number>(55);     // 55
```

Oto nasza pierwsza `generyczna funkcja`. Zacznijmy od syntaxu. Po pierwsze, zaraz po nazwie funkcji widnieje `<T>` . Zapis ten informuje naszą funkcję, że chcemy złapać / przechwycić typ na wejściu, żeby być później w stanie go wykorzystać. Następnie przechodzimy do parametrów funkcji. Syntax jest podobny do standardowego typowania funkcji, niekoniecznie generycznej. Różnica jest taka, że `<T>` z wejścia używamy teraz w parametrze, żeby nadać mu odpowiedni typ. W typ przypadku informujemy TS-a, że argument funkcji będzie tożsamy z typem przechwyconym na wejściu. Będzie taki sam. Co z typem wartości zwróconej z funkcji? Jest to `T` widniejące po nawiasach przechowujących parametry, za dwukropkiem. Jak już zapewne się domyślasz, funkcja ta zwróci wartość takiego samego typu jaką dostała na wejściu i jaką użyła w parametrze.

Ostatnie dwie linijki snippetu to wywołanie naszej funkcji. Istotne jest to, że przed nawiasami okrągłymi jawnie zadeklarowaliśmy jakiego typu zmienną będziemy dalej wykorzystywać. Dzięki temu TS wie, z czym będzie pracować i czego ma pilnować. Dowodem tego może być komunikat, który widzimy gdy w IDE najedziemy kursorem na wywołania tej funkcji:

Pierwsze wywołanie (String):

`function logItGeneric<String>(param: String): String`

Drugie wywołanie (Number):

`function logItGeneric<Number>(param: Number): Number`

Jak widzisz mamy jedną funkcję, która potrafi działać z wieloma typami. Dokładnie to chcieliśmy osiągnąć.

**Nazwa typu generycznego**

Dlaczego T ? Czy to musi być T? 

Nie. Nazwa to twoje widzimisie. Równie dobrze mógłbyś zrobić coś takiego:

```typescript
function logItGeneric<Adam>(param: Adam): Adam{...}
```

Pamiętaj jednak, że zapis korzystający z T jest już trochę ugruntowany w internecie i prawdopodobnie często będziesz go spotykał.

**Inferencja**

Wywołując funkcję generyczną nie musimy koniecznie podować typu. Wcześniej jawnie go deklarowaliśmy

```typescript
logItGeneric<String>("Adam"); // Adam
logItGeneric<Number>(55);     // 55
```

...ale warto mieć na uwadze, że poniższy kod również zadziała

```typescript
logItGeneric("Adam"); // Adam
logItGeneric(55);     // 55
```

W tym przypadku nie podaliśmy TypeScriptowi typu na tacy. Musiał zadziałać mechanizm inferencji. Kompilator był zmuszony określić odpowiedni typ patrząc na wartości podane w parametrze funkcji czyli:

- dla `logItGeneric("Adam")`  typ  <T> będzie `stringiem`
- dla `logItGeneric(55)` typ <T> będzie `numberem`

## Więcej parametrów w funkcji generycznej

Zgadza się. Nie jesteśmy ograniczeni do tylko jednego parametru. Możemy wykorzystać większą ich liczbę i każdy z nich będzie miał swoją unikalną nazwę. Przeanalizujmy poniższy przykład:

```typescript
function logPersonProperties<T,U>(firstParam: T, secondParam: U):void {
    console.log(typeof(firstParam), typeof(secondParam));
}
logPersonProperties<string, number>("Adam", 28); // string number
logPersonProperties<object, number[]>({}, [1,2,3]); // object object
```

Idea jest analogiczna jak w przypadku tylko jednego typu generycznego w funkcji.  Powyższa funkcja przechwytuje dwa typy `<T, U>`. W kolejnym kroku używa ich w celu określenia parametrów funkcji: `firstParam` i `secondParam`

Pierwsze wywołanie funkcji

```typescript
logPersonProperties<string, number>("Adam", 28); // string number
```

Sprawia, że `T` przechwyci `stringa` a `U` - `number`

Drugie wywołanie 

```typescript
logPersonProperties<object, number[]>({}, [1,2,3]); // object object
```

przypisze typ `object` do `T` i `tablicę liczb` (czyli obiekt, bo tablica to obiekt) do `U`. Stąd wynik `console.log`-a czyli `object, object`

## Generyczno niegeneryczny mix

Warto również wspomnieć o tym, że typy generyczne możemy mieszać z typami zwykłami takimi jak `number` czy `string`. Jestem leniwy więc żeby pokazać o co chodzi skorzystam z jednego z powyższych snippetów.

```typescript 
function logPersonProperties<T>(firstParam: T, secondParam: number):void {
    console.log(typeof(firstParam), typeof(secondParam));
}
logPersonProperties<string>("Adam", 28); // string number
logPersonProperties<number>(28, 128); // number number

```

Jak widzimy w powyższej funkcji, jesteśmy w stanie stworzyć mix typu generycznego i "zwykłego". Pierwszy parametr przyjmuje typ generyczny a drugi przyjmuje niegeneryczny typ `number`. Warto zwrócić uwagę, że podczas wywołania i w deklaracji funkcji mamy teraz tylko jedną wartość w nawiasie kątowym. Ma to sens bo w tych nawiasach podajemy typy generyczne a w tym przypadku mamy tylko jeden taki typ. 

## Metody typów generycznych

W poprzednim wpisie opisałem sytuację, w której możemy się znaleźć podczas korzystania z `unii`. Mam na myśli moment, w którym TS zacznie zrzędzić, że nie jest w stanie wykonać jakiejś metody na jednym z typów. Zakłada, że w unii będziemy korzystać z metod wspólnych dla każdego z jej członków. Jeśli nie pamiętasz o co kamam to zapraszam na mój <a href="https://bolimnieweb.pl/blog/typescript-podstawy" target="_blank">poprzedni wpis</a>.

Podczas wykonywania funkcji generycznej składającej się z więcej niż jednego typu mamy do czynienia z podobną sytuacją.

Szybki przykład:

```typescript
function superGenericFunction<T,U>(paramOne: T, paramTwo: U ) {
  console.log(paramOne.toUpperCase(), paramTwo.toUpperCase());
}

superGenericFunction<string,number>("ADAM", 28 );

```

Powyższy snippet powoduje podkreślenie funkcji `toUpperCase()` jako błąd. Jest tak ponieważ funkcja toUpperCase jest wykonywalna tylko na `stringach`. TypeScript wymusza na nas korzystanie z metod wykonywalnych na każdym z typów.

Dla porównania - jeśli metody toUpperCase zamienisz na `toString` to problem zniknie bo toString możesz wywołać na każdym typie.

## Generic constraints

Aby dobrze zrozumieć w czym pomagają nam "generic constraints" warto zacząć naukę od wprowadzenia do problemu. Zacznijmy od poniższej funkcji

```typescript
function addHorsePower(data: object) {
  return {...data, horsePower:250};
};

const firstCar = addHorsePower({
  brand: "Kia", 
  model: 'Stringer'
});

console.log(firstCar.model); // ERROR

```

Ma ona za zadanie przyjąć `obiekt` z informacjami na temat samochodu i zwrócić ten obiekt dodając uprzednio ilość koni mechanicznych.

Wynik tej funkcji przypisujemy do zmiennej `firstCar` i przekazujemy w parametrze obiekt z nazwą firmy i modelu auta. Problem jest w ostatniej linijce. Słowo `model` zostało podkreślone informując na o tym, że coś jest nie tak.

`BugFinder: Property 'model' does not exist on type '{ horsePower: number; }'.`

Błąd ten pojawił się ponieważ nigdzie jawnie nie zadeklarowaliśmy w jaki sposób powinien wyglądać  obiekt, który przyjmujemy w parametrze. Przekazaliśmy pewien jego wzór podczas przypisywania do zmiennej `firstCar` ale to nie wystarczy. TypeScript jeszcze nam nie wierzy i chce jasnej informacji jaki mam plan na ten obiekt.

Jednym z pomysłów na rozwiązanie tego problemu to użycie typów generycznych. Przecież pozwolą nam one "przechwycić" strukturę parametru podczas gdy będzie on wpadał do funkcji. Zobaczmy co z tego będzie

```typescript
function addHorsePower<T>(data: T) {
  return {...data, horsePower:250}
};

const firstCar = addHorsePower({
  brand: "Kia", 
  model: 'Stringer'
});

console.log(firstCar.model);

```

Błąd zniknął. Elegancko! `<T>` przechwycił nasz obiekt i teraz `console.log()` wiedział, że może się spodziewać konkretnej wartości pod `firstCar.model`. Zwróć jednak uwagę, że w drodze do ideału musimy jeszcze naprawić kolejną przeszkodę. Generyk, który powyżej użyliśmy pozwoli nam też wrzucić inny typ danych, nie tylko obiekt. Nie jest to pożądany efekt bo dane dotyczące naszych fur przechowujemy w obiekcie i nie planujemy tego zmieniać. Zwróć uwagę na błędne zachowanie naszego kodu.

```typescript
function addHorsePower<T>(data: T) {
  return {...data, horsePower:250}
};

const firstCar = addHorsePower({
  brand: "Kia", 
  model: 'Stringer'
});
const carTwo = addHorsePower("ADAM"); // BEZ BŁĘDU :( NIE CHCEMY STRINGA!

console.log(firstCar.model);

```
Jak widzisz, wprowadzony generyk pozwolił nam teraz na dodanie błędnego typu podczas deklaracji zmiennej `carTwo`. Przekazaliśmy `Stringa` i dla TS-a jest to poprawna operacja. Dlaczego? Nadal jeszcze nie doprecyzowaliśmy, że jesteśmy zainteresowani tylko pracą z obiektami. Postarajmy się to dopracować. Musimy w jakiś sposób zawęzić dane, które pozwalamy wpuścić do naszej funkcji. Na szczęście TS nam na to pozwala.

```typescript
function addHorsePower<T extends object>(data: T) {
  return {...data, horsePower:250}
};

const firstCar = addHorsePower({
  brand: "Kia", 
  model: 'Stringer'
});
const carTwo = addHorsePower("ADAM"); // ERROR
// Argument of type '"ADAM"' is not assignable to parameter of type 'object'.

console.log(firstCar.model);

```

Zwróć uwagę na pierwszą linijkę. TypeScript teraz wie, że mamy konkretny plan i nie jesteśmy na kacu. Jasno postawiliśmy sprawę, że wszystko to co nie jest obiektem może nas pocałować w tyłek i nie jesteśmy tym zainteresowani. Możemy być jeszcze bardziej pro i jeszcze mocniej zawęzić selekcję przed naszym klubem. 

```typescript
function addHorsePower<T extends {brand: string}>(data: T) {
  return {...data, horsePower:250}
};

const firstCar = addHorsePower({
  model: 'Stringer' // ERROR!
});

```

Dlaczego wciąż dostajemy błąd? 

Wracamy do pierwszej linijki powyższego snippeta. W tym momencie pracujemy TYLKO na obiektach i TYLKO takich, które mają w sobie atrybut `brand` i jego wartość jest typu `string`. Innymi słowy

```typescript 
const firstCar = addHorsePower(150); // Error
const secondCar = addHorsePower({}); // Error
const thirdCar = addHorsePower({model: "Stinger"}); // Error

const fourthCar = addHorsePower({brand: "Dacia"}); // GOOD!

const fifthCar = addHorsePower({brand: 150}); // Error

```

Właśnie dlatego

```typescript 
const firstCar = addHorsePower({
  model: 'Stringer' // ERROR!
});

```

... jest błędem. Nie spełniliśmy zadeklarowanych uprzednio restrykcji.

## Generyczne interfejsy
Kolejnym bardzo fajnym zastosowaniem generyków jest połączenie z `interfejsami`. Usprawnia to ich elastyczność i reużywalność. Weźmy jako przykład poniższy interfejs i jego użycie.

```typescript 
interface userData {
  id: number,
  name: string,
  data: object
}

const userOne: userData = {
  id: 150,
  name: 'Adam',
  data: {
    hobby: 'coding',
    nickname: 'whatever',
    age: 23
  }
}
```
Wszystko działa elegancko. Mijają miesiące i projekt się rozwija.

 Zauważyliśmy, że właściwość `data` w interfejsie `userData` powinien być w stanie obsłużyć nie tylko obiekty ale również inne typy danych. Jak już zapewne się domyślasz - typy generyczne mogą nam w tym pomóc. 

Najpierw dostosujmy nasz interfejs `userData`

```typescript
interface userData<T> {
  id: number,
  name: string,
  data: T
}

```

Następnym krokiem (i ostatnim) jest przekazanie danego typu podczas deklaracji zmiennej.

```typescript
const userOne: userData<string> = {
  id: 150,
  name: 'Adam',
  data: "Przykładowe informacje w postaci stringa"
}
```

## Podsumowanie

W tym wpisie to już wszystko. Przeglądając różne treści w internecie dotyczące TS-a (do czego zachęcam 🙂) zwrócisz uwagę, że jest jeszcze znacznie więcej możliwości i ciekawych rozwiązań płynących z tej technologii ale celem tego wpisu nie było przepisanie dokumentacji. Chciałem swoimi słowami opisać kilka dość istotnych kwestii, których zrozumienie pozwoli Ci na własną rękę zrozumieć inne zagadnienia, których **jeszcze** nie opisałem na blogu.  

## Źródła

<a href="https://www.tutorialsteacher.com/typescript/typescript-generic" target="_blank">tutorialsteacher.com/typescript/typescript-generic</a>

<a href="https://www.typescriptlang.org/docs/handbook/2/generics.html" target="_blank">typescriptlang.org/docs/handbook/2/generics.html</a>

<a href="https://www.youtube.com/watch?v=IOzkOXSz9gE&t=461s" target="_blank">youtube.com/watch?v=IOzkOXSz9gE&t=461s</a>

<a href="https://www.youtube.com/watch?v=nViEqpgwxHE" target="_blank">youtube.com/watch?v=nViEqpgwxHE</a>
