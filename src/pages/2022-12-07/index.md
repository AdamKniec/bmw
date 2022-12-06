---
path: "/blog/css-has-is-where-not"
date: "2022-12-07"
title: "CSS - has(), not(), is(), where()"
readTime: "10"
author: "Adam Knieć"
intro: "Przydatne pseudoklasy, które znacznie wpłyną na czytelność naszych arkuszy styli."
description: "Pseudoklasy is(), has(), not() i where(). Wprowadzenie i wyjaśnienie ich działania na przykładach"
tags: ["css"]
---

## Założenia wstępne

- Znajomość podstawowych zagadnień związanych z CSS-em (specificity, pseudoklasy)

## Wprowadzenie

Wiele wiosen temu, gdy zaczynałem swoją frontendową “przygodę”, nie byłem w stanie zrozumieć dlaczego niektórzy developerzy twierdzą, że “CSS jest łatwy i trudny jednocześnie”. Dla mnie stylowanie było przyjemną przerwą od szarpania się z JavaScriptem. Projekty mijały. Wraz z doświadczeniem, zwłaszcza tym przykrym, zrozumiałem, że źle napisany i chaotyczny CSS może wyprodukować więcej siwych włosów niż JavaScript Aglio e Olio. Dobry CSS ma odpowiednią strukturę, porządek, jest przemyślany i wykorzystuje swoje dobrodziejstwa. Dzisiaj chciałbym opisać kilka CSS-owych bajerów, których być może jeszcze nie znasz, a które warto mieć na swoim podorędziu. 

## has()    
Czym w zasadzie  jest has(). W skrócie - jest to pseudoklasa, którą możemy wykorzystać do odwołania się do “parent elementu” (chociaż nie tylko do parent elementu. Więcej na ten temat trochę niżej 👇)

Im szybciej przejdziemy do kodu tym lepiej.
Po pierwsze - stworzyłem mały poligon żebyśmy mieli czym się bawić. Zachęcam do korzystania :)

<a href="https://codepen.io/AdamKniec/pen/ZERWaGj?editors=1111">Codpen</a> TODO DOROBIC LINKA


**Targetowanie  na podstawie elementu**

Dodajmy pierwszą regułę wykorzystującą has().

Na samym dole pliku css dodaj poniższy kod:
```css
div:has(p) {
  background-color: red;
}
```
Syntax w podstawowych przykładach jest raczej prosty. Jak widzisz do has() możemy dorzucić jakieś ”argumenty”. W powyższym przykładzie dodaliśmy tam p. W jaki sposób można zinterpretować ten kod? Co on oznacza?

Mówiąc po ludzku - w powyższym przykładzie łapiemy diva, który zawiera w sobie paragraf i zmieniamy jego kolor tła. Ale zaraz… “jego” czyli paragrafu czy może diva ?
Odpowiedż brzmi: diva. Szukamy diva (parenta), który spełnia założenia podane w nawiasie pseudoklasy has() i ma odpowiedni kontent. Po dopisaniu tego kodu zauważ, że dwa pudełka (divy) zmieniły kolor tła.

Mówiąc jeszcze w inny sposób - wybraliśmy konkretne divy na podstawie ich zawartości.

W powyższym snippecie do wyboru konkretnego diva użyliśmy elementu p. Czy jesteśmy ograniczeni tylko do używania elementów HTML w argumentach pseudoklasy has()? Oczywiście, że nie. Możemy też w analogiczny sposób skorzystać z klas!


**Targetowanie na podstawie klasy**

**Targetowanie z wykorzystaniem kombinatorów**

**Targetowanie dziecka**

### "Forgiving" selector list

## is()

### Specyficzność

## where() (i czym się różni od is())

## not()

## Podsumowanie 

## źródła