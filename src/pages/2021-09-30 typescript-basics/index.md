---
path: "/blog/typescript-podstawy"
date: "2021-09-30"
intro: "Integracja czystego JS-a z (równie czystym) alkoholem i jak TypeScript może nam w tym pomóc. Podstawowe typy, tuple, tablice, enumy i inne dziwne rzeczy."
title: "TypeScript - pierwsza runda"
readTime: "15"
author: "Adam Knieć"
description: "Pierwsze starcie z TypeScriptem. Solidna porcja podstaw"
tags: ["typescript"]
---

## Założenia wstępne

Zakładam, że znasz JS-a w stopniu podstawowym.

Jeśli chcesz testować i pisać kod razem ze mną to polecam:

<a href="https://playcode.io/typescript/" target="_blank">playcode.io/typescript/</a>

## Intro

Przed niektórymi tematami nie da się uciekać w nieskończoność i prędzej czy później nas dopadną. Miałem podobnie z nauką `TypeScript`a. Cóż, może niekoniecznie przed nim "uciekałem" ale żaden z moich komercyjnych projektów nie był na nim oparty. Projektowy stack był dość obszerny i zawsze było "coś ważniejszego" do nadrobienia. Wymówka elegancka :) Nie mam sobie nic do zarzucenia - wiadomo.
Cały czas czekałem na ten "idealny" moment. Tak się składa, że chyba nastał. Zmieniam pracę. Nowa robota, nowy ja. Postaram się regularnie dzielić efektami mojej nauki. Może komuś będzie łatwiej zrobić ten pierwszy krok razem ze mną. No dobra, parę kroków mam już za sobą ale nadal w TypeScriptcie jestem cieniasem. Zapraszam!

## Typowy brak typów. Czym jest TypeScript?

A czym jest `JavaScript`? JavaScript jest językiem `dynamicznie typowanym`. To zdanie wystarczy żeby każdy "Antyjavascriptowiec" dostał odruchów wymiotnych. Spokojnie grubasku z logiem Javy na laptopie - to co zaraz przeczytasz może Ci się spodobać.
TypeScript to JavaScript z dodatkową składnią umożliwiającą `statyczne typowanie`. Oznacza to, że ty, jako deweloper wiesz najlepiej jakiego typu ma być dana zmienna / parametr i to ty musisz jawnie (chociaż nie zawsze - o tym później) zadeklarować konkretny typ. Innymi słowy - musisz poinformować Twój program jakiego typu dane powinny się w danym miejscu znaleźć. Co nam to daje? Początkowo trochę nerwów i dodatkowe rzeczy do googlowania (o tym też więcej napiszę poniżej). Znacznie ważniejsze jest to, co zyskujemy w dłuższej perspektywie czasu. Tym czymś jest bezpieczeństwo. TypeScript to zabawka, która patrzy nam na ręce podczas pisania kodu i sprzedaje nam liścia w twarz jak tylko popełnimy błąd. Lepszy liść w momencie pisania kodu niż podczas oglądania sypiącej się apki na prezentacji dla klienta - zaufaj mi. Dzięki TS-owi nie znajdziesz się więcej w sytuacji, w której na produkcji czytasz komunikaty błędów mówiące, że program nie jest w stanie wykonać funkcji `map` na parametrze, który przekazałeś do bardzo ważnej funkcji. Funkcja ta czeka na tablicę a dostała obiekt. UPS! `Jest to typowy (😏) przykład braku kontroli na typami`. Jak możemy się przed tym bronić? Jak już pewnie się domyślasz - użyć TS-a.

## Problem

Zanim przejdziemy do różnych rozwiązań jakie oferuje TypeScript, postarajmy się postawić w sytuacji, w której najbardziej go brakuje. Przychodzi do Ciebie przełożony i daje Ci zadanie do zrobienia ASAP. Aplikacja, która pokazuje na stronie button. Button ten, po kliknięciu ma wylogować tablicę liczb powiększonych o 2. Jakich liczb? Powiedzmy, że na ten moment będą to liczy, które podamy w parametrze funkcji, która ma je wylogowywać. Nie mamy czasu na TypeScripta i to rozwiązanie musi być dostarczone w Vanilla JS-ie. Udało Ci się to zrobić. Oto kod:

```html
<button id="executeFunction">Click</button>

<!-- index.html -->
```

```javascript
const button = document.getElementById("executeFunction");
const iExpectAnArrayFunction = (param) => {
  console.log(param.map((i) => i + 2));
};
const triggerFunction = () => {
  iExpectAnArrayFunction([1, 2, 3, 4, 5]);
};
button.addEventListener("click", triggerFunction);

// script.js
```

Pojawia się button. Button po kliknięciu w niego wylogowuje tablicę liczb z odpowiednio powiększonymi wartościami. Świetnie.

Minęły 2 lata. Wracasz do biura po intensywnym firmowym chla... SPOTKANIU. Okazało się, że musisz coś delikatnie poprawić w kodzie sprzed lat, który powiększał liczby w tablicy. Łatwizna. Zmiana polega na tym, że do funkcji, która wylogowuje liczby musisz przekazać zwrotkę z API. Ta zwrotka to obiekt:

```javascript
{
  arrayOfNumbers: [1, 2, 3, 4, 5];
}
```

Jesteś na ultra kacu i jedyne o czym myślisz to ostatnie namaszczenie i ponury żniwiarz. Twoje zmiany wyglądają tak:

```javascript
const button = document.getElementById("executeFunction");
const iExpectAnArrayFunction = (param) => {
  console.log(param.map((i) => i + 2));
};
const triggerFunction = () => {
  iExpectAnArrayFunction({
    // nowy parametr!
    arrayOfNumbers: [1, 2, 3, 4, 5],
  });
};
button.addEventListener("click", triggerFunction);

// script.js
```

Zapisujesz plik. Widzisz zielone `compiled successfully`. Nic Cię więcej nie obchodzi. Push na mastera i jazda na kawę.

Dwa dni później. Prezentacja dla klienta. Twój przełożony prezentuje na callu z dumą Twoje zmiany. 120 osób na Teamsach. All eyes on You. Następuje klik w button. Konsola odpalona i czeka na wynik.

Ku Twojemu zaskoczeniu na ekranie pojawia się paskudny błąd

`Uncaught TypeError: param.map is not a function`

Okazało się, że jednak nawet w tak małej zmianie można wpakować się w bagno. Przekazaliśmy do funkcji obiekt jako parametr. Funkcja starała się wykonać na obiekcie (z parametru) metodę `.map()` ale ta metoda działa tylko na tablicach.

Jak możesz uniknąć takiej sytuacji w przyszłości?

Jeśli pierwszym rozwiązaniem jakie przyszło Ci do głowy jest wzięcie UŻ po firmowym "spotkaniu" to masz problem i radzę odwiedzić poniższy link:

https://www.aa.org.pl/

Zobaczmy teraz jak w prosty sposób TypeScript jest w stanie nam pomóc.

```typescript
const button = document.getElementById("executeFunction");
const iExpectAnArrayFunction = (param: []) => {
  console.log(param.map((i) => i + 2));
};
const triggerFunction = () => {
  iExpectAnArrayFunction({
    // nowy parametr!
    arrayOfNumbers: [1, 2, 3, 4, 5],
  });
};
button.addEventListener("click", triggerFunction);

// script.ts
```

Zwróć uwagę na tę konkretną linijkę kodu:

```typescript
const iExpectAnArrayFunction = (param:[]) => {
// script.ts
```

Pojawiła się tutaj nowa składnia. Szczegóły omówimy sobie niedługo ale oznacza ona to, że oczekujemy w miejscu tego parametru pojawienia się tablicy. W tym przykładzie przekazaliśmy obiekt zamiast tablicy i TypeScript momentalnie to wyłapuje (nie musimy nawet klikać w button). Po pierwsze, ta linijka...

```typescript
arrayOfNumbers: [1, 2, 3, 4, 5];

// script.ts
```

... została podkreślona na czerwono informując nas o problemie. Po drugie, widzimy następujący komunikat:

`Argument of type '{ arrayOfNumbers: number[]; }' is not assignable to parameter of type '[]'`

Jeśli konfiguracja TypeScripta jest przygotowana poprawnie, każda próba zapisania pliku będzie skutkować pojawieniem się błędu. Będzie Cie on prześladował aż tego problemu nie poprawisz.
W tym tkwi siła TS-a. Wymaga on od Ciebie doprecyzowania typów w niektórych miejscach ale w nagrodę patrzy Ci na ręce i ostrzega za każdym razem gdy pojawi się niezgodność. Zobaczmy co jeszcze potrafi.

## Podstawowe typy

Syntax w przypadku podstawowego typowania zmiennych jest bardzo prosty. Po nazwie zmiennej dodajemy dwukropek i dopisujemy konkretny typ. Zobaczmy w jaki sposób możemy otypować proste zmienne typu `string`, `number` i `boolean`.

```typescript
let stringVariable: string = "String";
stringVariable = 5; // Error!
stringVariable = "Ziemia jest płaska";

let numberVariable: number = 20;
numberVariable = 55;
numberVariable = [1, 2, 3, 4, 5]; // Error!

let booleanVariable: boolean = true;
booleanVariable = 10; // Error!
booleanVariable = false;
```

## Any

Typ `any` jest wytrychem na wszystkie zamki. Wpuści do siebie każdą wartość. Jak już zapewne się domyślasz, nie jest to oczekiwane działanie w większości miejsc i sytuacji. Staraj się wykorzystywać ten typ jako ostateczność tam gdzie ma zastosowanie.

```typescript
let iLoveEveryType: any;

iLoveEveryType = "Stringa łyknie";
iLoveEveryType = true;
iLoveEveryType = [{ number: 1 }];
```

## Tablice

Sposób pierwszy:

```typescript
let scientificFacts: string[] = ["Illuminati", "Obama has a tail"];
scientificFacts = {}; // Error!
scientificFacts = "Nie mam pojęcia co robię"; // Error!
scientificFacts = ["Adam", "Knieć", "Cokolwiek"];
```

Drugi sposób zakłada wykorzystanie typu generycznego. Na ten moment nie przejmuj się tym za bardzo. W kolejnym wpisie postaram się bardziej szczegółowo opisać `generyki`.

```typescript
let scientificFactsPartTwo: Array<string> = [
  "Covid is a myth",
  "Vaccines are bad",
];
scientificFactsPartTwo = 22; // Error!
scientificFactsPartTwo = {}; // Error!
scientificFactsPartTwo = "Foliarze"; // Error!
scientificFactsPartTwo = ["Antyszczepionkowcy", "są", "super"];
```

Zapewne domyśliłeś się już, że jeśli chciabyś zadeklarować zmienną, która ma przechowywać tablicę liczb to słowo kluczowe `string` musisz zmienić na `number`.

```typescript
let arrayOfNumbers: number[] = [1, 2, 3, 4, 5];
```

Co w przypadku, gdy tablica musi przechowywać wartości różnego typu ? Poniżej dwa sposoby na rozwiązanie tego problemu.

```typescript
let mixedTypesArray: (string | number)[] = [
  "Thats a string ",
  32,
  "Another one",
  3,
  0,
  "Apple",
];

let mixedTypesArray2: Array<string | number> = [
  "Thats a string ",
  32,
  "Another one",
  3,
  0,
  "Apple",
];
```

W powyższym snippecie deklarujemy zmienne, które mają przechowywać w tablicy dane typu `string` lub `number`.

## Tuple

Kolejnym sposobem na przechowywanie w tablicy zmiennych o różnym typie jest `tuple`.

```typescript
let myTupleArray: [string, number, string, object] = [
  "That is a string",
  0,
  "Adam",
  {},
];
myTupleArray = ["", 23, "asd", {}]; // OK
myTupleArray = ["", 23, "asd", true]; // ERROR !
```

## Enum

`Enum` jest konstrukcją składniową stosowaną w innych językach programowania takich jak C# lub Java. TypeScript również pozwala nam z niej skorzystać. Czy spotkałeś się kiedyś w Vanilla JS z sytuacją, w której tworzyłeś obiekt, który miał za zadanie przechowywać pewną stałą wartość dla danego klucza?

```javascript
const countryByCode = {
  GER: "Germany",
  PL: "Poland",
  US: "United States",
  UK: "Ukraine",
};

// Vanilla JS
```

Enum zdaje się być dobrym kandydatem na tego typu konstrukcję.

**String Enum**:

```typescript
enum countryByCode = {
  GER = 'Germany',
  PL = 'Poland',
  US = 'United States',
  UK = 'Ukraine'
}

console.log(countryByCode.GER) // Germany

// TypeScript
```

**Numeric Enum**:

Czasami mamy potrzebę przechowywać w Enumie wartości numeryczne. Możemy uzyskać taki efekt w następujący sposób:

```typescript
enum wordToNumber {
  ZERO,
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
}
console.log(wordToNumber.ZERO); // 0
console.log(wordToNumber.THIRD); // 3
```

Co w przypadku, gdy nie chcemy żeby pierwsza zmienna w numeric enumie była zainicjalizowana z wartością `0`? Czy jesteśmy w stanie coś z tym zrobić? Na szczęście tak, zwróć uwagę na poniższy przykład.

```typescript
enum wordToNumber {
  ZERO = 5,
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
}
console.log(wordToNumber.ZERO); // 5
console.log(wordToNumber.THIRD); // 8
```

W powyższym snippecie udało się nam uzyskać oczekiwany efekt. Zwróć uwagę, że pierwsza zmienna została zainicjowana z wartością 5. Każda kolejna będzie miała wartość powiększą o 1.

## Void

Kolejne słowo kluczowe, które zdarzy Ci się napotkać w kodzie napisanym w TS-ie. `void` (jak można wyczytać z dokumentacji) działa troche jak przeciwieństwo `any`. Oznacza brak jegokolwiek typu. Zazwyczaj wykorzystujemy ten typ w momencie gdy mamy do czynienia z funkcją, która nic nie zwraca.

```typescript
function warnUser(): void {
  alert("Funkcja bez konkretów");
}

warnUser();
```

## Union Types

Co w przypadku, gdy pracujemy z funkcją, która przyjmuje wartości `number` lub `string`? Mogłbyś w tym momencie wpaść na pomysł, że `any` sprawdzi się w typ przypadku idealnie. Faktycznie, warningi jesteśmy w stanie w ten sposób ograć ale jak już wiemy, `any` pozwoli tam wrzucić w s z y s t k o. To już nie jest zamierzony efekt bo nas interesują tylko dwa typy. Znacznie lepszym rozwiązaniem będzie użycie unii (union).

```typescript
let numberOrStringPlease: number | string;
numberOrStringPlease = 23;
numberOrStringPlease = "Adam";
numberOrStringPlease = true; // ERROR
numberOrStringPlease = ["Illuminati", "confirmed"]; // ERROR
```

Użycie w funkcji:

```typescript
const showUserAge = (age: string | number) => {
  console.log(age);
};

showUserAge("12");
showUserAge(12);
showUserAge(true); // ERROR
showUserAge({}); // ERROR
```

Uważam, że w przypadku unii warto wspomnieć o małej pułapce, która pojawia się wraz z nimi.
Musimy pamiętać, że gdy chcemy wykonać jakąś operację na danych, które otypowaliśmy przy pomocy unii, musimy upewnić się, że ta operacja jest wykonalna dla każdego z tych typów. Wiem, że prawdopodobnie jeszcze nie jest to dla Ciebie jasne. Przeanalizujmy przykład:

```typescript
const showUserAge = (age: string | number) => {
  console.log(age.toUpperCase);
};

showUserAge("152");
```

Wygląda to całkiem sensownie, ale TS podkreślił `toUpperCase` i zrzędzi, że

`Property 'toUpperCase' does not exist on type 'string | number'.BugFinder: Property 'toUpperCase' does not exist on type 'number'`

Komunikat błędu dość jasno przedstawił w czym problem. Nie jesteśmy w stanie wykonać metody `toUpperCase` na wartości typu `number`. Jak wspomniałem wyżej - kod wykonywany na wartościach z unii musi być wykonywalny na wszystkich jej członkach. W tym przypadku zasada ta nie została spełniona i stąd ten błąd.

Aby pozbyć się tego problemu możemy najpierw upewnić się, że dany typ pozwoli nam na konkretną operację.

```typescript
const showUserAge = (age: string | number) => {
  if (typeof age === "string") {
    console.log(age.toUpperCase);
  }
};

showUserAge("Adam");
```

## Inferencja typów

TypeScript pozwala programiście na jawne określenie jakiego typu wartości oczekujemy w danym miejscu. Na początku tego wpisu zaznaczyłem jednak, że nie zawsze jest to wymagane. Inferencja jest mechanizmem, który pozwala korzystać z dobrodziejstw TypeScripta bez używania syntaxu TypeScripta. W pewien sposób przejmuje on odpowiedzialność za "otypowanie" danej zmiennej. Co to właściwie ma znaczyć? Najlepiej zacząć dyskusję od przykładu.

```typescript
let boolIGuess = true;

boolIGuess = 5;
```

Co widzimy na powyższym snippecie? Deklaracja zmiennej i zmiana jej wartości. Wygląda to jak zwykły JS prawda? Na pierwszy rzut oka mogłoby się wydawać, że w kontekście TS-a nic nam taki zapis nie da. Prawda jest taka, że ten kod jest też całkowicie poprawnym kodem TypeScriptowym. Pewnie zwróciłeś już uwagę, że nigdzie jawnie nie określiliśmy typu. W takim wypadku TypeScript przejmuje pałeczkę i sam "zakłada" jakiego typu powinna być wartość w danej zmienniej.
W powyższym przykładzie możemy zaobserwować, że kompilator wyrzuci błąd:

`BugFinder: Type '5' is not assignable to type 'boolean'.`

Czemu TS założył, że chcemy tam przechowywać wartości boolowskie? Odpowiedź jest bardzo prosta - zauważył, że podczas deklaracji przypisaliśmy do niej wartość typu 'boolean' i stwierdził, że ta zmienna powinna przechowywać wartości dokładnie tego typu.

Kod z powyższego snippeta działa tak samo jak ten:

```typescript
let boolIGuess: boolean = true;

boolIGuess = 5;
```

Ciekawostka: W przypadku, gdy nie określimy jawnie typu i TS polegnie przy próbie zgadywania, ustawiony zostanie typ `any`.

## Interface

W każdej aplikacji spotkamy się z funkcjami. Są one ze sobą połączone. Jedna wykonuje inną i przekazuje jej parametry. Czasami są one bardzo proste jak zwykły string a czasami są bardziej skomplikowane i zawierają obiekty, tablice, funkcje i inne cuda.

Jak w TS-ie poradzić sobie z dodawaniem typów do takiej funkcji? Rozważmy poniższy przykład. Nie jest to jeszcze rozwiązanie ale najpierw chcę zobrazować pewien problem:

```typescript
const testFunction = (paramObj: {
  data: number[];
  name: string;
  age: number;
  greet: Function;
}) => {
  console.log(paramObj.data, paramObj.name, paramObj.age, paramObj.greet);
};

testFunction({
  data: [1, 2, 3, 4],
  name: "Adam",
  age: 10,
  greet: () => {
    console.log("Hello darkness");
  },
});
```

Najpierw zadeklarowaliśmy funkcję, która destrukturyzuje różne wartości z obiektu, otrzymanego jako parametr. Już na pierwszy rzut oka widać, że wygląda to średnio. Mamy tylko cztery wartości wyciągane z obiektu a czytelność kodu spadła znacząco. Dzięki Interfejsom jesteśmy w stanie trochę poprawić czytelność kodu.

```typescript
interface testFunctionProps {
  data: number[];
  name: string;
  age: number;
  greet: Function;
}
const testFunction = (paramObj: testFunctionProps) => {
  console.log(paramObj.data, paramObj.name, paramObj.age, paramObj.greet);
};

testFunction({
  data: [1, 2, 3, 4],
  name: "Adam",
  age: 10,
  greet: () => {
    console.log("Hello darkness");
  },
});
```

Wygląda lepiej prawda? Stowrzyliśmy pierwszy interface. Zawarliśmy w nim wszystko to czego oczekujemy w parametrze i dodaliśmy odpowiednie typy.
Kolejnym krokiem było już tylko użycie interfejsu `testFunctionProps` w naszej funkcji `testFunction`.

```typescript
const testFunction = (paramObj: testFunctionProps) => { ...
```

Czytelność nie jest jedyną korzyścią płynącą z interfejsów. Ta konstrukcja daje nam znacznie więcej:

- parametry opcjonalne
- parametry readonly
- rozszerzanie interfejsów
- reużywalność

... i inne. Interfejsy postaram się jeszcze opisać w szczegółach w innym wpisie. Celem tego były podstawy, które szybko można wdrożyć w każdym projekcie.

## Type alias

Powyższy problem moglibyśby załatać jeszcze na inny sposób - używając naszego własnego typu.

```typescript
type Car = {
  name: string;
  maxSpeed: number;
};

function showCarDetails(carData: Car) {
  console.log(carData.name, carData.maxSpeed);
}

showCarDetails({ name: "Kia", maxSpeed: 250 });
```

Trochę zmieniony syntax. Sposób użycia analogiczny. Pierwsze pytanie, które chcesz zadać to "Jaka jest różnica między typem a interfejsem?".
Odpowiem na to pytanie w kolejnych wpisach :) Na ten moment bądź świadomy istnienia takiej składni bo zdecydowanie na nią natrafisz.

## Typowanie wyniku funkcji

Otypować możesz (i powinieneś) paramerty funkcji - to już wiemy. Istotne jest również to, jakiej zwrotki oczekujemy od danej funkcji. Czy powinna ona zwrócić stringa? A może nic? Poniższy kod przybliży syntax pozwalający nam rozwiązać ten problem. Pojawił się on już w tym wpisie ale zależy mi jednak na osobnym podrozdziale, żeby nikomu to nie umknęło.

```typescript
let myFunc = (): string => console.log("Whatever"); // ERROR
myFunc = (): string => 2 + 2; // ERROR
myFunc = (): string => "Pfizer od tyłu to SZATAN";
```

Konkretny typ dodajemy po okrągłych nawiasach i poprzedzamy go dwukropkiem. Bardzo proste rozwiązanie a daje nam kolejne punkty do bezpieczeństwa i oddala od potencjalnych "fakapów".

## Podsumowanie

Zdecydowana większość twórców internetowych robiąc wprowadzenie do TS-a wychwala go pod niebiosa aż do przysłowiowego porzygu. Każda formułka leci mniej więcej w ten sposób:

TypeScript to cudowne narzędzie umożliwiające nam statyczne typowanie w JS-ie. Chroni nas przed błędami i osobiście nie wyobrażam sobie projektu bez tej technologii... bla bla bla i tak dalej.

Co do samego założenia się z nimi zgadzam ale jeśli ktoś chce poznać opinię bez słodzenia i podniecania się to przedstawiam moją:

TypeScript jest technologią wartą poznania. Powoli zjada rynek i pojawia się na coraz większej ilości ofert. Pozwala nam dodawać typy co w perspektywie czasu pomaga unikać wielu typowych (😏) błędów. Musimy jednocześnie pamiętać o tym, że na samym początku nauki i podczas wdrażania go do istniejącego projektu - zwłaszcza dla osób mniej doświadczonych - może on być trochę problematyczny. Nowy syntax, nowe błędy i trzymanie nas za "mordę" żebyśmy czasem o czymś nie zapomnieli.

Często również ludzie podchodzą do TypeScripta jak do jeża. Miny rzedną jak po rozszerzonej maturze z fizyki. Prawda jest taka, że podstawy są bardzo proste i nawet jeśli wdrożysz do projektu same podstawy to przysiesie to relatywnie dużą wartość i na pewno się opłaci. Nawet jeśli twój kod TS nie jest idealny i można by go ulepszyć to każde usprawnienie minimalizujące ryzyko jest na wagę złota.

## Źródła

<a href="https://www.typescriptlang.org/docs/handbook/" target="_blank">typescriptlang.org/docs/handbook/</a>

<a href="https://www.tutorialsteacher.com/typescript">tutorialsteacher.com/typescript</a>
