---
path: "/blog/rwd-mixin"
date: "2021-08-11"
title: "RWD Mixin"
readTime: "5"
author: "Adam Kniec"
description: "Boli Mnie Web - RWD Mixin"
tags: ["CSS"]
---
## Założenia wstępne

Aby z łatwością zrozumieć i wdrożyć to co opiszę poniżej powinieneś:
- umieć korzystać z preprocesora SASS / SCSS w stopniu podstawowym
- wiedzieć czym jest funkcja
- rozumieć działanie `@media-queries`
- znać CSS
- rozumieć koncepcję RWD (Responsive Web Design)
  
## Problem

RWD w tych czasach jest absolutnym standardem (a przynajmniej powinno być).
 Praktycznie każdą webową apkę trzeba w jakiś sposób zmodyfikować na większych lub mniejszych rozdzielczościach. Zdarzają się projekty, w których dość sporo kodu jest umieszczana w regułach `media`. W wielu przypadkach standardowe style są pisane przy zachowaniu naturalnego flow - od góry do dołu a następnie poszczególne klasy są nadpisywane w blokach `media query` na dole pliku. 
 Wygląda do w sporym uproszczeniu w taki sposób.

```css
.nav {
    background-color: red;
}
.intro {
    width: 100px;
}
.contact {
    height: 200px;
}
.footer {
    display: flex;
}


/* Poniżej nadpisujemy reguły dla urządzeń mobilnych */
@media (max-width: 760px) {
    .nav {
        background-color: teal;
    }
    .intro {
        width: 200px;
    }
    .contact {
        height: 25px;
    }
    .footer {
        display: block;
    }
}
```
Nie ma dramatu w takim odchudzonym przykładzie, jednak przy nieco większej ilości kodu zmuszało mnie do scrollowania pliku od góry do dołu setki razy co przyprawiało mnie o oczopląs. Gdyby tylko był sposób na trzymanie kodu z bloków `media` razem z daną regułą...

## Mixiny

Mixiny są zdecydowanie tematem na odrębny blog post, jednak na potrzeby tego wpisu przyjmijmy do informacji, że `@mixin` jest cudownym trikiem dostarczonym przez SASS-a, który pozwala nam definiować reguły CSS, które z łatwością będziemy mogli reużywać w naszej aplikacj.

Tak się składa, żę dzieki mixinom możemy ugryźć temat modyfikacji związanych z RWD w dość ciekawy sposób. Spójrz na poniższy snippet.

```css
@mixin breakpoint($point) {
   @if $point == mobile {
     @media (max-width: 760px) { @content ; }}
   @else if $point == laptop {
     @media (max-width: 1400px) { @content ; }}

    /* Tutaj możesz dopisać więcej breakpointów. Tylko nie przesadź :) */
}
```

Stworzyliśmy wyżej mixin o nazwie `breakpoint`. Wygląda on trochę jak funkcja w JS prawda? Przyjmuje on parametr o nazwie `$point`. Wewnątrz naszej funkcji mamy instrukcję `if`. Sprawdza ona jaki parametr został dostarczony na wejściu i w oparciu o te wiedzę tworzy regułę `media`, która dodatkowo w swoim bloku kodu umieszcza `@content`. Dziwne co?
Wystarczy pokazać działanie tego mixina w akcji i wszystkie kropki się połączą.

Powiedzmy, że chcemy sprawić aby nasz element o klasie `.box` zmieniał kolor w zależności od tego czy jesteśmy na małym czy może nieco większym urządzaniu.

```css
.box {
  width: 50px;
  height: 50px;
  background-color: red;
  @include breakpoint(laptop){
    background-color: pink;
  }
  @include breakpoint(mobile){
    background-color: teal;
  }
}
```
Stworzyliśmy wyżej regułę, która:
1. Zmienia kolor tła na czerwony i zmienia rozmiary elementu
2. Korzystając z naszego mixina wewnątrz swojego ciała zmienia zachowanie elementu na większych ekranach nadając mu różowy kolor tła.
3. Również korzystając z mixina `breakpoint` zmienia tło  elementu `.box`, jednak na nieco mniejszych ekranach.

Masz już pomysł co jest tym magicznym `@content`, o ktorym wspomniałem wyżej ? 
Są nim poszczególne style jakie wrzucamy do środka naszego mixina podczaj gdy go używamy. Biorąc pod uwagę poprzedni przykład:
- `background-color: pink;` stał się `@content`-em dla `breakpoint(laptop)`
- `background-color: teal;` stał się `@content`-em dla `breakpoint(mobile)`

CodePen z przykładem znajdziesz poniżej. Pobaw się rozmiarami okna przeglądarki i zauważ, że element zachowuje się tak jak chcieliśmy.

<a href="https://codepen.io/AdamKniec/pen/OJmQZeR" target="_blank">CodePen pokazujący działanie mixina</a>

## Podsumowanie

Wpisem tym chciałem Ci pokazać prawdopodobnie jedno z wielu podejść do tematu RWD. Mi osobiście podoba się idea mixina, który wewnątrz reguły informuje nas jak powinien wyglądać / zachować się element na ekranie o danej rozdzielczości. 
Mimo wszystko pamiętaj o tym, żeby nie traktować tego sposobu jako jedynej słusznej drogi.

Na koniec małe porównanie podejścia z mixinem i z regułami `@media` na dole pliku. Oba snippety modyfikują element w taki sam sposób.

```css
/* Mixin breakpoint musi być dostępny w pliku tej reguły. Albo go tam wrzuć albo zaimportuj z innego pliku :) */
.box {
  width: 50px;
  height: 50px;
  background-color: red;
  @include breakpoint(laptop){
    background-color: pink;
  }
  @include breakpoint(mobile){
    background-color: teal;
  }
}
```
```css
.box {
  width: 50px;
  height: 50px;
  background-color: red;
}

@media (max-width: 1400px) {
  .box {
    background-color: pink;
  }
  
}

@media (max-width: 760px) {
  .box {
    background-color: teal;
  }
}
```

## Źródła


<a href="https://responsivedesign.is/articles/helpful-sass-mixins/" target="_blank">responsivedesign.is/articles/helpful-sass-mixins/</a>
