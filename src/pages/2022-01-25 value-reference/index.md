---
path: "/blog/wartosci-i-referencje"
date: "2022-01-25"
title: "Wartości i referencje"
author: "Adam Knieć"
intro: "Dokładne wyjaśnienie różnic między referencją a wartością. W tym wpisie poznamy jakie pułapki czekają na developerów nie znających tych zagadnień"
description: "Wartość i referencja w JS. Dokładne wyjaśnienie i praktyczne przykłady"
tags: ["js"]
---

## Założenia wstępne

- podstawowa wiedza z zakresu tworzenia zmiennych, obiektów, funkcji i ich praktycznego wykorzystania

## Wprowadzenie

Mamy w JS dwa podstawowe typy danych. Są nimi typy `prymitywne/proste` i `obiekty`.
Jest to hasło jasno przedstawiane w każdym kursie dot. JS-a. Jest to dość szybkie do wyjaśnienia zagadnienie ale poza prostą formułką trzeba być również świadomym tego w jaki sposób te typy zachowują się w różnych praktycznych przypadkach.
Są one bardzo lubiane przez rekruterów i zakładam, że każdy z nas spotkał na swojej drodze przynajmniej jedno pytanie, w którym musiał przewidzieć co stanie się z daną zmienną po jej uprzednim skopiowaniu, nadpisaniu i przeoraniu na wszelkie możliwe sposoby. Czy lubię tego typu zadania? Oczywiście, że nie. Czy sprawdzają one wiedzę kandydata? No niestety tak.

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

Bardzo istotne w tym prostym przykładzie jest to, że stworzyliśmy dwa całkowicie inne pudełka z zawartością. Dwie całkowicie inne i niezależne zmienne mające swoje unikalne miejsce w pamięci komputera. W przypadku typów prymitywnych, nawet gdy jedna zmienna budowana jest na podstawwie drugiej, to nadal są to całkowicie osobne byty (kopie) i w powyższym przypadku, mimo, ze zmienna `a` otrzymuje nową wartość to zmienna `b` (budowana na jej podstawie) juz nie jest tym zainteresowana. W momencie jej tworzenia dostala ona kopię ówczesnego stanu zmiennej `a` (ktory na poczatku wynosił 1) i tak juz zostało. Zmiana `a` nie zmieni już jej wartości bo ich drogi w pamięci komputera całkowicie się rozeszły.

W skrócie - nadpisanie jednej z tych zmiennych po ich wcześniejszym zadeklarowaniu nie ma wpływu na drugą.

<img src="../2022-01-25 value-reference/imgs/values-diagram.png" />
