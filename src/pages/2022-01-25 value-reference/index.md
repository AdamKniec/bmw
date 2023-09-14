---
path: "/blog/wartosci-i-referencje"
date: "2022-01-31"
title: "Wartości i referencje"
author: "Adam Knieć"
intro: "Dokładne wyjaśnienie różnic pomiędzy referencją a wartością. W tym wpisie poznamy pułapki czekające na developerów, którzy nie znają tych zagadnień."
description: "Wartość i referencja w JS. Dokładne wyjaśnienie i praktyczne przykłady"
tags: ["js"]
---

## Założenia wstępne

- podstawowa wiedza z zakresu tworzenia zmiennych, obiektów, funkcji i ich praktycznego wykorzystania

## Wprowadzenie

Mamy w JS dwa podstawowe typy danych. Są nimi typy `prymitywne/proste` i `obiekty`.
Jest to hasło jasno przedstawiane w każdym kursie dot. JS-a. Jest to dość szybkie do wyjaśnienia zagadnienie ale poza prostą formułką trzeba być również świadomym tego w jaki sposób te typy zachowują się w różnych praktycznych przypadkach.
Są one bardzo lubiane przez rekruterów i pewnie każdy z nas spotkał (lub spotka!) na swojej drodze przynajmniej jedno pytanie, w którym musiał przewidzieć co stanie się z daną zmienną po jej uprzednim skopiowaniu, nadpisaniu i przeoraniu na wszelkie możliwe sposoby. Czy lubię tego typu zadania? Oczywiście, że nie. Czy sprawdzają one wiedzę kandydata? No niestety tak.

W tym wpisie postaram się przybliżyć zagrożenia i pułapki płynące z różnic między typami złożonymi i prostymi.

## Wartość

Zacznijmy od początku. Zacznij od zastanowienia się jakie będą wyniki logów z poniższego snippeta. Postaraj się nie zaglądać niżej zanim tego nie przekminisz :)

```javascript
let a = 1;
let b = a;

a = b + 1;

console.log(a); // ??
console.log(b); // ??
```

Co zadziało się  wyżej?

Deklarujemy zmienną `a` i przypisujemy do niej wartość `1`.
W kolejnej linijce kopia wartości zmiennej `a` zostaje tez przypisana do nowej zmiannej nazwanej `b`. Następnie nadpisujemy wartość zmiennej `a` wartością ze zmiennej `b` powiększoną o 1.

Dla osób, które nie są jeszcze zaznajomione z tym mechanizmem może się wydawać, że oba logi wyrzucą wartość `2`. Takie myślenie ma trochę sensu bo przecież nadpisujemy zmienną `a` podczas gdy zmienna `b` jest jej kopią, prawda?

Cóż - i tak i nie. Oto poprawne wyniki

```javascript
console.log(a); // 2
console.log(b); // 1
```

Bardzo istotne w tym prostym przykładzie jest to, że stworzyliśmy dwa całkowicie inne pudełka z zawartością. Dwie całkowicie inne i niezależne zmienne mające swoje unikalne miejsce w pamięci komputera. W przypadku typów prymitywnych, nawet gdy jedna zmienna budowana jest na podstawie drugiej, to nadal są to całkowicie osobne byty (kopie) i w powyższym przypadku, mimo, ze zmienna `a` otrzymuje nową wartość to zmienna `b` (budowana na jej podstawie) już nie jest tym zainteresowana. W momencie jej tworzenia dostala ona kopię ówczesnego stanu zmiennej `a` (który na poczatku wynosił 1) i tak już zostało. Zmiana `a` nie zmieni już jej wartości bo ich drogi w pamięci komputera całkowicie się rozeszły.

W skrócie - nadpisanie jednej z tych zmiennych po ich wcześniejszym zadeklarowaniu nie ma wpływu na drugą.

<img src="../2022-01-25 value-reference/imgs/values-diagram.png" />

Myślę, że powinno to być całkiem zrozumiałe.
Nieco inna sytuacja ma miejsce w przypadku gdy operujemy na typach złożonych, czasami nazywanych typami `referencyjnymi`.

## Obiekty (typy referencyjne)

Na start przeanalizujmy sobie prosty przykład:

```javascript
const person = {
  name: "Adam",
};

let alien = person;

alien.name = "Edyta Górniak";

console.log(person); // ?
console.log(alien); // ?
```

Zatrzymaj się teraz na chwilę i zastanów jaki będzie wynik powyższych logów.
Kod jest dość prosty i wręcz oczywiste wydaje się, że...

```javascript
console.log(person); // {name: "Adam"}
console.log(alien); // {name: "Edyta Górniak"}
```

No niestety `powyższy snippet nie pokazuje poprawnych odpowiedzi`. Prawidłowy wynik jest następujący:

```javascript
console.log(person); // {name: "Edyta Górniak"}
console.log(alien); // {name: "Edyta Górniak"}
```

Zrób teraz kolejny przystanek. Czy jesteś w stanie wyjaśnić dlaczego tak się stało? Jeśli nie wiesz lub podświadomie czułeś, że kręciłeś się wokół własnej osi próbując to czytaj dalej.

Jak już zapewne zauważyłeś, zmodyfikowanie obiektu `alien`...

```javascript
alien.name = "Edyta Górniak";
```

...wpłynęło również na obiekt `person`. Dlaczego?

Prawda jest taka, że obiekty są klasyfikowane jako `typy referencyjne` nie bez przyczyny. `person` i `alien` nie mają na swój użytek osobnych kopii tego obiektu. Przetrzymują one jedynie **referencję** do tej struktury. Gdy ją zmodyfikujemy (strukturę), wpłynie na oba obiekty.

Jest to dość abstrakcyjne i jeśli masz problem ze zrozumieniem tego zagadnienia to wyobraź sobie wielką pustynię. Znajdują sie na niej dwie wioski i między nimi jedyny zbiornik wodny. Obie wioski czerpią z tego samego źródła i jeśli ktoś wpadłby na pomysł żeby to źródło zatruć, powybija obie społeczności.

Wygląda to mniej wiecej w ten sposób:
<img src="../2022-01-25 value-reference/imgs/reference-diagram.png" />

Po pierwsze - ani słowa na temat wyglądu mojego diagramu. Nie każdy jest tak uzdolniony graficznie jak ty.

Po drugie - diagram przedstawia nasze zmienne `person` i `alien`. Obie przetrzymują `REFERENCJĘ` do tego samego obiektu (źródła) i zmodyfikowanie go wpłynie na obie zmienne.

Dlaczego zrozumienie tego jest istotne? Są pewne operacje, które nas w tej kwestii sprawdzają i podkładają nogi. Jedną z takich operacji jest kopiowanie obiektów.

## Kopiowanie obiektów

Obiekty można kopiować korzystając z różnych sposobów i metod.
Rozróżniamy dwa główne “rodzaje” tej operacji:

- shallow copy
- deep copy

Na ten moment zajmijmy sie pierwszym z tych sposobów.
Przeanalizujmy sobie poniższy przykład:

```javascript
let programmer = {
  name: "Adam",
  position: "Frontend",
  company: "Netguru",
  personalDetails: {
    boring: true,
    foliarz: true,
    stoopkarz: false,
    favNumber: 100,
  },
};

const fakeProgrammer = Object.assign({}, programmer);

fakeProgrammer.name = "Andrzej";
fakeProgrammer.company = "Comarch";
fakeProgrammer.personalDetails.boring = false;
fakeProgrammer.personalDetails.stoopkarz = true;
fakeProgrammer.personalDetails.favNumber = 102;
```

Sporo się na tym snippecie wydarzyło ale ze spokojem - przeanalizujmy go sobie krok po kroku.

Po pierwsze - tworzymy nowy obiekt o nazwie `programmer`. Ma on w sobie kilka właściwości z wartościami typu prostego (`name`, `position`,`company`) i jedną właściwość o nazwie `personalDetails`, która trzyma referencję do obiektu z kilkoma dodatkowymi informacjami na temat naszego programisty.

Kolejna linijka to tworzenie kopii naszego obiektu `programmer` i przypisywanie tej kopii do nowej zmiennej o nazwie `fakeProgrammer`. Korzystamy w tym momencie z natywnie dostępnej metody
`Object.assing()`. Jeśli nie jesteś pewien jak działa ta metoda to zapraszam do zapoznania sie z poniższym linkiem.

<a href="https://developer.mozilla.org/pl/docs/Web/JavaScript/Reference/Global_Objects/Object/assign" target="_blank" rel="noopener">MDN Object.assign()</a>

Przejdźmy do kolejnych kroków. Mamy tam sporo nadpisań naszej kopii programmera. Idea jest taka, że chcemy naszą kopię troche zmodyfikować.

Na spokojnie przeczytaj sobie kod z powyższego snippeta.

No dobra, teraz przejdźmy do konkretów.
Oto zadanie rekrutacyjne. Zanim przescrollujesz do mojego wyjaśnienia - postaraj się samodzielnie zastanowić nad rozwiązaniem.

”Jaki będzie wynik poniższych console.logów” ?

```javascript
console.log(fakeProgrammer);
console.log(programmer);
```

Zacznijmy może od zmiennej `fakeProgrammer`. I tak nic konkretnego się tam nie dzieje.

W pierwszej kolejności nadpisujemy kilka prostych zmiennych a potem kilka wartości z zagnieżdżonego obiektu, więc na chłopski rozum wynik `console.log(fakeProgrammer)` powinien wyglądać mniej więcej w ten sposób

```javascript
{
	name: "Andrzej",
	company: "Comarch",
	position: "Frontend",
	personalDetails: {
		boring: false,
		foliarz: true,
		stoopkarz: true,
		favNumber: 102
	}
}
```

Jeśli również Twoje rozwiązanie wyglądało w ten sposób to gratuluję :) Myślę, że druga część zadania pójdzie równie gładko. Nie zapomnijmy, że mamy jeszcze jednego console.loga do rozpracowania.

Tutaj sprawa jest dość prosta bo przecież nie zmienialiśmy oryginalnego obiektu “programmer” prawda? Wynik `console.log(programmer)` oczywiście musi wyglądać tak:

```javascript
{
  name: "Adam",
  position: "Frontend",
  company: "Netguru",
  personalDetails: {
    boring: true,
    foliarz: true,
    stoopkarz: false,
    favNumber: 100
  }
}

```

Proste nie?

No nie :)

Jak się pewnie domyśliłeś - to nie jest poprawny wynik. (to już ostatni taki manewr w tym wpisie - obiecuję 😇)

Jest to analogiczna pułapka jak ta z początku wpisu. Jeśli jeszcze nie do końca kumasz to wyjaśnijmy to sobie krok po kroku.

Po pierwsze - jak wygląda poprawne rozwiązanie?

```javascript
{
  name: "Adam",
  position: "Frontend",
  company: "Netguru",
  personalDetails: {
		boring: false,
		foliarz: true,
		stoopkarz: true,
		favNumber: 102
	}
}

```

No i znowu ta gówniana sytuacja... grzebanie w kopii namieszało w oryginalnym obiekcie, którego teoretycznie nawet nie ruszaliśmy.

W kopii `fakeProgrammer` modyfikujemy dwie różne struktury: typy proste i wartości w obiekcie. Zauważ, że nadpisywanie w kopii właściwości trzymających typy proste (`name`, `company`) nie ma żadnego wpływu na odpowiadające im, te same właściwości w oryginale.

Dzieje się tak, ponieważ w naszym obiekcie `fakeProgrammer` stworzyliśmy całkowicie inne właściwości (skopiowaliśmy je)...

```javascript
name: "Adam",
position: "Frontend",
company: "Netguru",

```

Mówiąc inne, mam na myśli, że mają one swoje własne miejsce w pamięci komputera. Możemy je modyfikować i w żaden sposób nie wpłynie to na ich odpowiedniki w oryginalnym obiekcie.

Sprawa ma się inaczej jeśli chodzi o zagnieżdżony obiekt `personalDetails`. Dlaczego modyfikowanie go w kopii zmieniło wartości również w oryginale? Jest to podobna sytuacja do tej ze snippetu powyżej z Edytą Górniak.

Cóż - dochodziemy tutaj do tematu zwanego płytką kopią `(shallow copy)`. Do stworzenia zmiennej `fakeProgrammer` skorzystaliśmy właśnie z takiego mechanizmu.

Metoda `Object.assign`, którą wykorzystaliśmy
jest w stanie skopiować dla nas pola, które przechowują wartości prymitywne (dlatego właśnie mogliśmy nadpisac w kopii pola `name`, `position` i `company` bez większych konsekwencji) ale w przypadku gdy w oryginalnym obiekcie, który chcemy skopiować znajduje się obiekt (lub inny typ referencyjny np `array`) to płytka kopia przetrzyma dla nas tylko REFERENCJĘ tej struktury.

Przypomnij sobie moje poprzednie porównanie do pustyni i dwóch wiosek, które czerpały z tego samego źródła. Podobna sytuacja miała miejsce w przypadku naszych zmiennych `programmer` i `fakeProgrammer`. `Shallow copy` stworzyło dla nas całkowicie nowe
`name`, `position`, `company` w kopii `fakeProgrammer` ale w przypadku zagnieżdżonego obiektu `personalDetails` przekopiowana została jedynie **referecja** do struktury:

```javascript
{
    boring: true,
    foliarz: true,
    stoopkarz: false,
    favNumber: 100
  }
```

## Porównanie wartości i referencji

Wiedza dotycząca referencji i wartości ma również swoje zastosowanie w przypadku porównywania.

Zacznijmy od typów prostych.

```javascript
const a = 1;
const b = 1;
console.log(a === b); // true
console.log(a === 1); // true
console.log(a === b); // true
```

W tym przypadku po prostu porównaniu ulegają wartości. Prosta sprawa. Zero zaskoczeń.

Porównywanie typów referencyjnych (klasycznie) odbywa się na trochę innych zasadach. Właściwie to na jednej i jest ona dość krótka.

`Dwa obiekty są "równe (takie same)" tylko jeśli odnoszą się do tego samego obiektu`

```javascript
let a = {};
let b = a;
```

W powyższym przykładzie zmienne `a` i `b` przetrzymują referencję do tego samego obiektu, więc:

```javascript
alert(a == b); // true
alert(a === b); // true
```

Warty przedstawienia jest jeszcze jeden przykład:

```javascript
let a = {};
let b = {};

alert(a == b); // false
```

W tym momencie fanboye wszystkiego co jest "anty-js" aż się obudzili z podjarki :)

-> "CO ZA GÓWNO!", "BOŻE CO ZA BEZSENS"... itp :)

Jest to dziwne, zgadzam się. Zdaję sobie też sprawę, że inne języki programowania nie robią takich "szpagatów". Z drugiej strony, powiedzmy sobie szczerze, to nie jest aż taki duży problem. Wystarczy raz to zrozumieć i mieć z głowy całą frustrację :)

Ale do rzeczy, dlaczego tym razem `false`?

Ano dlatego, że w tym przypadku `a` i `b` nie dzieliły wspólnej referencji. Każda z tych zmiennych miała swoją osobistą zabawkę w postaci pustego obiektu (referencji do niego). Dopóki nie dzielą wspólnej referencji, dopóty dla komputera będą całkowicie różnymi bytami, nawet pomimo faktu, że teoretycznie obie trzymają identyczny pusty obiekt.

## Nadpisanie referencji

Tym razem bez wprowadzenia. Zacznijmy od przykładu:

```javascript
function modifyPerson(person) {
  person.age = 25;
  person = {
    name: "Adam",
    age: 50,
  };

  return person;
}
var personA = {
  name: "Andrzej",
  age: 12,
};
var personB = modifyPerson(personA);

console.log(personA); // Tutaj zadanie dla Ciebie
console.log(personB); // Tutaj zadanie dla Ciebie
```

Parametr funkcji `modifyPerson` jest referencją do obiektu `personA`. Modyfikujemy jego `age`.
W kolejnym kroku tej funkcji nadpisujemy obiekt `person`. Jest to kluczowy moment tego skryptu.

Jeśli nadpisujemy referencję w ten sposób to automatycznie tworzymy **nową referencję** odcinamy się od obiektu `personA`.

Dodajmy kilka pomocniczych logów:

```javascript
function modifyPerson(person) {
  console.log(person === personA); // true // referencja do tego samego obiektu
  person.age = 25;
  person = {
    name: "Adam",
    age: 50,
  };
  console.log("person === personA", person === personA); // false // Po nadpisaniu - person i personA nie mają już tej samej referencji

  return person;
}
var personA = {
  name: "Andrzej",
  age: 12,
};
var personB = modifyPerson(personA);
```

Finalnie, w obiekcie `personA` udało się nam jedynie nadpisać `age`. Zostało to spowodowane wywołaniem funkcji `modifyPerson`. Potem (w ciele funkcji) stworzyliśmy już nową referencję więc historia się kończy zostawiając nas z:

```javascript
console.log(personA); // {name:"Andrzej", age: 25}
```

Teraz czas na `personB`. W tym przypadku sprawa jest prosta bo wynikiem loga będzie zwrócony przez tą funkcję obiekt (nowo stworzona referencja).

```javascript
console.log(personB); // {name: "Adam", age: 50}
```

## Podsumowanie

Znajomość praw jakimi rządzą się wartości i referencje nie tylko podniesie Twoje zrozumienie JS-a i tego, w których sytuacjach może on kopnąć Cię w tyłek. Zrozumienie ich sprawi także, że poczujesz się znacznie pewniej podczas technicznych rozmów rekrutacyjnych. Niestety rekruterzy uwielbiają zadania typu "Jaki będzie wynik console.loga".
Czytając ten wpis możesz odnieść wrażenie, że wielokrotnie tłumaczę te same zagadnienia. Jeśli tak było, to był to zamierzony efekt. Jak pierwszy raz zacząłem zgłębiać tematy wartości i referencji to każdy, nawet najkrótszy artykuł generował u mnie złudzenie kompetencji. Byłem pewien, że wszystko jest dla mnie jasne. Po jakimś czasie trafiałem w internecie (lub na rekrutacji :) ) na zadanie sprawdzające u mnie właśnie te umiejętności i okazywało się, że nie byłem w stanie "skompilować" poprawnego rozwiązania w swojej głowie. Po kilku porażkach wziąłem się za ten temat na poważnie i zrozumiałem, że właśnie przeoranie wielu przykładów z wieloma pułapkami pozwoliło mi poczuć się pewniej i przenieść moje zrozumienie tematu na wyższy level. To samo polecam Tobie :)

## Źródła

<a href="https://www.javatpoint.com/shallow-copy-in-javascript" target="_blank" rel="noopener">javatpoint.com/shallow-copy-in-javascript</a>

<a href="https://masteringjs.io/tutorials/fundamentals/shallow-copy" target="_blank" rel="noopener">masteringjs.io/tutorials/fundamentals/shallow-copy</a>

<a href="https://dmitripavlutin.com/value-vs-reference-javascript/" target="_blank" rel="noopener">dmitripavlutin.com/value-vs-reference-javascript/</a>

<a href="https://javascript.info/object-copy" target="_blank" rel="noopener">javascript.info/object-copy</a>
