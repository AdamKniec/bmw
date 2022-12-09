---
path: "/blog/css-has-is-where-not"
date: "2022-12-10"
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
W skrócie - jest to pseudoklasa, którą możemy wykorzystać do odwołania się do “parent elementu” (chociaż nie tylko do parent elementu. Więcej na ten temat trochę niżej 👇)

Im szybciej przejdziemy do kodu tym lepiej.
Po pierwsze - stworzyłem mały poligon żebyśmy mieli czym się bawić. Zachęcam do korzystania :)

<a href="https://codepen.io/AdamKniec/pen/ZERWaGj?editors=1111" target="_blank">Codpen</a>

**Targetowanie  na podstawie elementu**

Dodajmy pierwszą regułę wykorzystującą has().

Na samym dole pliku css dodaj poniższy kod:
```css
div:has(p) {
  background-color: red;
}
```
Syntax w podstawowych przykładach jest raczej prosty. Interestujące są "argumenty" przekazane w nawiasach. W powyższym przykładzie dodaliśmy tam `p`. W jaki sposób można zinterpretować ten kod? Co on oznacza?

Mówiąc po ludzku - w powyższym przykładzie łapiemy diva, który zawiera w sobie paragraf i zmieniamy jego kolor tła. Ale zaraz… “jego” czyli paragrafu czy może diva ?
Odpowiedż brzmi - diva. Szukamy diva (parenta), który spełnia założenia podane w nawiasie pseudoklasy has() i ma odpowiedni kontent. Po dopisaniu tego kodu zauważ, że dwa pudełka (divy) zmieniły kolor tła.

Mówiąc jeszcze w inny sposób - wybraliśmy konkretne divy na podstawie ich zawartości.

W powyższym snippecie do wyboru konkretnego diva użyliśmy elementu p. Czy jesteśmy ograniczeni tylko do używania elementów HTML w argumentach pseudoklasy has()? Oczywiście, że nie. Możemy też w analogiczny sposób skorzystać z klas!

Przejdźmy ponownie do codepena. Zakomentuj poprzednio wklejony kod i na jego miejsce wrzuć poniższy snippet

**Targetowanie na podstawie klasy**

```css
div:has(.inner-paragraph) {
  background-color: red;
}
```

Myślę, że widzisz już pewien pattern 🙂. W nawiasach pseudoklasy has() skorzystaliśmy z klasy. Dzięki temu jesteśmy w stanie zmodyfikować style diva, który ma w sobie element z klasą "inner-paragraph”.

**Targetowanie z wykorzystaniem kombinatorów**

```css
div:has(> span) {
  background-color: red;
}
```
Powyższy snippet pokazuje, że jesteśmy w stanie również skorzystać z kombinatorów w celu wyselekcjonowania konkretnego elementu. W powyższym przykładzie łapiemy diva, którego dzieckiem jest span.

Już na tem etapie prawdopodobnie wpadłeś/aś na kilka pomysłów praktycznego zastosowanie tej pseudoklasy. Niejednokrotnie przyjdzie nam zmierzyć się z sytuacją, gdzie będziemy musieli ostylować kilka komponentów, które są praktycznie identyczne ale jeden z nich będzie miał mały detal, który   wpłynie na paddingi / layout lub inne kosmetyczne zmiany. Do tej pory, najpopularniejszym rozwiązaniem w takiej sytuacji było dodanie dodatkowej klasy, na podstawie której będziemy w stanie dodać kilka unikalnych modyfikacji. To jedna z sytuacji, gdzie has() może zabłysnąć. Sprawdźmy co jeszcze potrafi!

**Targetowanie dziecka**

Czy jest ono w ogóle możliwe? Wcześniej powiedzieliśmy sobie, że has() służy do targetowania parent elementu na podstawie zawartości. Coż, jest to prawda ale dzięki temu możemy skorzystać z pewnego tricku.

```css
div:has(svg) > p {
  padding: 0;
}
```

Powyższy snippet pokazuje, że przy pomocy has możemy się też dostać do dziecka danego elementu. Jak to działa?

Po pierwsze - przy pomocy has() targetujemy diva, który w swoim contencie ma ikonkę (w tym przypadku element svg). Skoro mamy już dostęp do parenta, to teraz śmiało możemy skorzystać z kombinatora `>` aby dostać się do jego dzieci. Właśnie to robi druga część powyższego selektora.

Bez dopisania żadnej dodatkowej klasy znaleźliśmy parenta na podstawie jego contentu i byliśmy w stanie zmodyfikować style jego dziecka. Całkiem sprytne, prawda ?

### "Forgiving" selector list

Do tej pory każdy podtytuł w tym poście był po polsku. Po 20 minutach zastanawiania się jak przetłumaczyć “forgiving selector” zdecydowałem się to tłumaczenie olać. Może ktoś oświeci mnie w komentarzach 😃

Do rzeczy…

Zazwyczaj w CSS-ie, błąd w selektorze skutkował wyrzuceniem całej reguły do śmieci. has() jest trochę bardziej wyrozumiały. Jeśli popełnimy błąd i przykładowo dopiszemy element, który nie jest wspierany (np. pseudoklasę :after) to błędny fragment zostanie zignorowany a reszta  będzie ostylowana zgodnie z naszymi instrukcjami.

Jeśli pierwszy raz spotykasz się z tym zagadnieniem to przeanalizujmy sobie to od początku.

```css
 p, span, article:whatever {
  background-color: red;
}
```

W powyższym snippecie chcemy zmienić kolor tła dla zadeklarowanej listy elementów. Lista ta składa się z elementów: p, span oraz article:whatever. Dwa z nich są poprawne ale ten ostatni jest z czapy. Niestety, przez ten jeden niepoprawny element cała reguła zostanie zignorowana.

Tak jak już wspomniałem, sytuacja wygląda  inaczej, jeśli korzystamy z has()

```css
div:has(p, span, article:whatever) {
  background-color: orangered;
}
```

Powiedzmy, że szukamy diva, który ma w sobie dany content. Lista argumentów jest identyczna jak w poprzednim snippecie. Pomimo błędu, style zostaną zaaplikowane dla diva, który w swoim contencie zawiera `p` oraz `span`.

## is()
Kolejna z omawianych dzisiaj pseudo-klas. Przydaje się zwłaszcza w sytuacjach, w których mamy do czynienia z  zagnieżdżonymi selektorami. W wielu przypadkach taki selektor staje się niezwykle nieczytelny i nieelegancki. Przejdźmy do przykładu.

Powiedzmy, że chcemy “złapać” wszystkie spany i paragrafy w headerze. Selektor mógłby wyglądać następująco:

```css
header p,
header span {
	background-color: red;
}
```

Przy użyciu is(),  jesteśmy w stanie nieco uprościć ten selektor.

```css
header :is(span, p) {
	background-color: red;
}
```

Przyznajmy, że na tym przykładzie nie widać jeszcze wielkiej wartości płynącej z tego rozwiązania. Poniższy przykład może być nieco bardziej przekonujący.

Stylujemy każdy rodzaj nagłówka znajdujący się w elemencie section lub article

```css
section h1, section h2, section h3, section h4, section h5, section h6, 
article h1, article h2, article h3, article h4, article h5, article h6 {
  color: orangered;
}
```

Możemy osiągnąć dokładnie taki sam efekt w znacznie krótszej formie dzięki naszej nowej pseudoklasie

```css
:is(section, article) :is(h1, h2, h3, h4, h5, h6) {
  color: orangered;
}
```

Znacznie mniej powtórzeń i poprawiona czytelność - profit  🙂

Warto również zaznaczyć, że podobnie jak w przypadku has() - lista selektorów przekazywana w nawiasach is() jest "forgiving". Działa to na tej samej zasadzie jak w omawianej powyżej pseudoklasie has().

Lista ta może przyjmować  dokładnie takie same rodzaje parametrów. Mogą to być elementy html jak a, p span czy div ale również klasy .btn, .header, itd. Użycie kombinatorów również jest dozwolone.

Tak samo jak w przypadku pseudoklasy has(), ograniczeniem jest użycie pseudoelementów w liście argumentów, więc poniższy przykład

```css
div:is( ::after) {
  display: block;
}
```

nie zadziała!

### Specyficzność


Słowo kluczowe is() - samo w sobie nie dorzuca żadnych punktów specyficzności, ale argumenty przekazane w nawiasach już tak. Oznacza to, że najmocniejszy zawodnik z nawiasów będzie dorzucał swoje punkty specificity do ogólnych punktów całej reguły.

```css
.section :is(.title, p) { // Wyższa specyficzność przez klasę .title
	color: orangered;
}


.section p {
	color: blue;
}
```

W powyższym snippecie wyższą specyficzność ma pierwsza reguła. Na jej moc składają się 2 elementy:

- .section
- .title (najsilniejszy zawodnik w grupie przekazanej w nawiasach)

W przypadku drugiej reguły:

- .section
- p

**Połącznie where() i is()**

Pseudoklasy where() oraz is() możemy łączyć. Oto dowód:

```css
:is(article, div, section):has(+ :is(h2, h3, h4)) {
  margin: 0.5rem;
}
```

W celu zrozumienia tej reguły, skupmy się najpierw na pseudoklasach is(). Pierwsza z nich pozwala nam wybrać elementy div, article i section. Dzięki drugiemu is() jesteśmy w stanie przeszukać dzieci w poszukiwaniu elementow h2, h3 i h4. Dzięki pseudoklasie has() wybieramy takie article, div oraz section, ktorych bezpośrednimi dziećmi są nagłowki typu h2, h3 lub h4.

## where() (i czym się różni od is())

W celu zrozumienia pseudoklay where() najlepiej przescrollować trochę wyżej, do poprzedniego nagłówka. Dokładnie tego, w którym opisuję psueudoklasę is(), i przeczytać całość jeszcze raz.  Nie, nie mam wylewu. Ich działanie jest prawie identycznie. Jedyną znaczącą różnicą, o której trzeba pamiętać jest specyficzność (specificity). W przypadku where() warto pamiętać, że, ze specificity elementów z nawiasów nie przyczynia się w żaden sposób do siły reguły.

## not()
Dzięki not() możemy wykluczyć dany rodzaj elementu z naszego obszaru poszukiwań. Najlepiej pokazać jego działanie na przykładach.

```css
/*Elementy p, które nie mają klasy active*/
p:not(.active) {
  color: red;
}

/*Elementy które nie są paragrafami*/
div :not(p) {
  text-decoration: none;
}

/*Elementy, które nie są paragrafami i nie są divami*/
body :not(p):not(div) {
	background-color: teal;
}

/*Dzieci div-a, które nie są paragrafami i nie mają klasy active*/
div :not(p, .active) {
  display: none;
}

/*Elementy wewnątrz nawigacji, które nie są buttonami o klasie active*/
nav :not(button.active) {
  display: none;
}
```

Not() ma kilka mankamentów i pułapek. Prawdopodobieństwo napotkania którejś z nich raczej jest niskie ale warto chociaż raz przeczytać listę  dostępną na MDN.

<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:not#description" target="_blank">MDN - not()</a>
## Podsumowanie 

Powyższe pseudoklasy wprawdzie nie są czymś absolutnie przełomowym ale zdecydowanie pozytywnie wpłyną na czytelność arkuszy styli. Zwłaszcza tych  zbyt skomplikowanych i składających się z mnóstwa zagnieżdżeń. Pisanie kodu DRY zawsze powinno być z tyłu naszej głowy i znajomość powyższych trików znacznie nam w tym pomoże.

Jak już wspomniałem, utrzymanie źle napisanego CSS-a bywa koszmarem. Postarajmy się do tego nie dopuścić ;) Niech powyższe narzędzia będą krokiem w dobrą stronę :) 

## źródła
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:has" target="_blank"> MDN - has()</a>

<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:is" target="_blank">
MDN - is()</a>

<a href='https://www.youtube.com/watch?v=McC4QkCvbaY&t=440s](https://www.youtube.com/watch?v=McC4QkCvbaY&t=440s' target="blank">Kevin Powell - is()</a>

<a href="https://www.youtube.com/watch?v=OGJvhpoE8b4" target="_blank">Kevin Powell - has()</a>

<a href="https://www.youtube.com/watch?v=pvH35ZFPbc4&t=449s" target="_blank">Kevin Powell - where()</a>

<a href="https://css-tricks.com/the-css-has-selector/" target="_blank">CSS Tricks examples</a>
