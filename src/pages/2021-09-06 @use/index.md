---
path: "/blog/@use"
date: "2021-09-06"
title: "@use"
readTime: "10"
author: "Adam Knieć"
description: "@import niedługo przejdzie na emeryturę. @use jest rekomendowaną alternatywą, która jest bardzo intuicyjna i rozwiązuje sporo problemów."
tags: ["CSS"]
---
## Założenia wstępne

Jeśli czytając ten wpis nie chcesz się czuć zakręcony jak bąk w tulipanie to musisz umieć sprawnie poruszać się w  projektach z kilkoma plikami SCSS, które mogą być między sobą importowane i korzystają z syntaxu SASS-a. Dodatkowo - zakladam, że wiesz w jaki sposób kompliować SCSS na CSS.

## Intro

Czasami odnoszę wrażenie, że bardzo łatwo przyzwyczaić się do pewnych rozwiązań związanych z SASS-em. Najpierw uczymy  się z dokumentacji czegoś nowego, implementujemy to w projekcie, potem w drugim, trzecim, dziesiątym, piętnastym. 
 Struktura naszych projektów jest podobna, style organizujemy podobnie. Życie jest wspaniałe.

 Jeśli jakieś zmiany w SASS są wprowadzane, zazwyczaj są dość "delikatne" i łatwe do przetrawienia. Nie czujemy takiej presji jak w przypadku JS-a i związanaj z nim bezustannej gonitwy frameworków i ich updatów.
 Takie podejście jest dość zgubne i usypia naszą czujność. 
Prawda jest taka, ze SASS nieustannie się rozwija i czasami można  łatwo przegapić zmiany, które są niezwykle pomocne i rozwiązują uciążliwe problemy. Zwłaszcza jeśli pracujemy w projekcie, który ma zdecydowanie za mało styli żeby implementacja SASS-a miała sens albo jeśli customowych styli w projekcie nie ma wcale. W takiej sytuacji nie mamy dodatkowego "przymusu" żeby od czasu do czasu sprawdzić co się zmieniło.

Uświadomiłem to sobie gdy podczas przeglądania dokumentacji Sass-a natknąłem się na poniższy fragment:

`"The Sass team discourages the continued use of the @import rule. Sass will gradually phase it out over the next few years, and eventually remove it from the language entirely. Prefer the @use rule instead."`


<a href="https://sass-lang.com/documentation/at-rules/import" target="_blank">sass-lang.com/documentation/at-rules/import</a>


## Pierwsze zderzenie z teraźniejszością

Ze co ? Deprecated ? `@import`, ktory widnieje w 3/4 moich projektów i repozytoriów ? 

Szperasz dalej i dowiadujesz się, żę Twoja ukochana wtyczka do VSC kompilująca SCSS na CSS zaczyna sypać warningami, i straszy Cię informacjami w stylu "@import deprecated ".

Nagle zaczynasz się czuć jakbyś  obudził się ze snu zimowego albo jakby Twoi rodzice powiedzieli Ci, że jesteś adoptowany / adoptowana. Zastanawiasz się jak to do cholery możliwe, że Ci to umknęło i masz wrażenie jakbyś przegapił 10 lat rozwoju ludzkości.
Znasz to uczucie ? :) 

Co więcej, po kilku rozmowach z moimi znajomymi okazało się, że nie jestem  odosobnionym przypadkiem i nie  tylko ja to przespałem.

## @use vs @import

Czemu akurat przyczepili się do starego dobrego `@import`-a? 
Tak się składa, że miał kilka dolegliwości, które nieco utrudniały pracę ze stylami. Oto niektóre z nich, które wyszczególnione w oficjalnej dokumentacji SASS-a:

- Wszystko globalne! Zmienne, mixiny, funkcje. Każdy z tych bajerów automatycznie stawał się globalnie dostępny. Sprawia to, że zlokalizowanie miejsca deklaracji danego kawałka kodu staje się znacznie trudniejsze.
- Przez to, że wszystko jest globalne możemy mieć problemy z `przestrzeniami nazw` (`namespace`)
- Nie mamy możliwości zadeklarowania prywatnych właściwości. Przecież nie wszystkim w danym pliku musimy chcieć się dzielić.

`@use` jest oficjalną alternatywą dla `@import`-a. Korzystając z niej jesteśmy w stanie wyeliminować  powyższe  mankamenty.

## Importowanie i global scope 

Przejdźmy do konkretów. Jak zastąpić `@import` naszą "nową" zabawką ? 
Przeanalizujmy poniższy przykład.  Przy okazji zrozumiemy jeszcze problem globalnego scope-u zmiennych w plikach SCSS.

Dostajesz zadanie. Musisz zmienić kolor tła na stronie na czerwony. Tworzysz PR i Twoje zmiany wygladają tak:
```css

$main-red: red;

body {
    background-color: $main-red;
}

// main.scss
```

Wszystko działa, jednak jeden ze sprawdzających Twój kod zwrócił uwagę, że lepiej wrzucić zmienne z kolorami do osobnego pliku. To nie problem. Zróbmy to.

```css

$main-red: red;

//colors.scss
```

Oczywiscie main musi wiedzieć o tej  zmiennej z nowego pliku. Zaimportujmy ją.

```css
@import  './colors.scss';

body {
    background-color: $main-red;
}

// main.scss

```

Tło staje sie czerwone. Po naszym małym refactorze nadal szystko działa sprawnie.

Tygodnie mijają, projekt się rozwija.
Po jakimś czasie chcemy zaimportować kolejny plik do `main.scss`. Plik ten będzie miał za zadanie dodanie kilku zmian stylistycznych (no shit Sherlock). Powiedzmy, że chcemy zmienić kolor tekstu na stronie na niebieski. Na potrzeby przykładu załóżmy, że w pliku z kolorami `colors.scss` ktoś dodał dodatkową zmienną z kolorem niebieskim.

```css
body {
    color: $main-blue; //używamy zmiennej, do której ten plik teoretycznie nie ma dostępu
}

// fontColor.scss
```

Oczywiście nowy plik musimy zaimportować w `main.scss`

```css
@import  './colors.scss';
@import './fontColor.scss';

body {
    background-color: $main-red;
}

// main.scss
```

Użyliśmy zmiennej `$main-blue`, którą znaleźliśmy w pliku `colors.scss` (załóżmy, że tam była). Po chwili zdaliśmy sobie sprawę, że przecież w pliku `fontColor.scss` nie ma żadnego importu. Jakim cudem zmiana zadziałała i kolor tesktu zmienił sie na niebieski ? 


To jest właśnie jeden z problemów, o których wspominałem wcześniej. Globalne zmienne. 
Przeanalizujmy jeszcze raz plik `main.scss`. Mamy tam dwa importy, jeden pod drugim.
Problem polega na tym, że plik `fontColor.scss` automatycznie ma dostęp do zmiennych z pliku `colors.scss`. Newet jeśli ich jawnie nie importował. Niby nic wielkiego ale musisz przyznać, że rodzi to pewne zagrożenia i komplikacje, przykładowo związane z konfliktami nazw.

## Przestrzenie nazw (namespaces)

Postarajmy sie naprawic ten problem korzystajac z `@use`

Po pierwsze zmieniamy nasze `@import` na `@use` (kapitan oczywisty strikes again)

```css
@use  './colors.scss';
@use './fontColor.scss';

body {
    background-color: $main-red;
}

// main.scss
```

Zapisujemy zmiany. Kompilacja styli zacznie wyrzucać bląd.

`Error: Undefined variable:   color: $main-blue;  fontColor.scss`

No tak. To ma sens. Korzystając z `@use` musimy najpierw zaimportować to czego chcemy użyć. W przypadku pliku `fontColor` potrzebujemy zawartości pliku `colors.scss`. Wciągnijmy go.

```css
@use 'colors';

body {
    color: $main-blue;
}

// fontColor.scss
```

Zrobione. Ale zaraz, to nadal nie działa bo kompilacja cały czas krwawi... O co chodzi ?

Korzystając z `@use` musimy pamiętać, że nasze zmienne zostają przypisane do konkretnej przestrzeni nazw - `namespace`-a . Nasz plik nazywa się `colors.scss` więc jego namespacem w tym przypadku będzie `colors`

```css
@use 'colors';

body {
    color: colors.$main-blue;
}

// fontColor.scss

```

Zapisujemy. Nareszcie plik `fontColor.scss` nie wyrzuca żadnych błędow. Teraz analogicznie musimy poprawić  `main.scss`


```css

@use  './colors.scss';
@use './fontColor.scss';

body {
    background-color: colors.$main-red;
}

// main.scss
```

Udało się. Kompilacja zielona. Brak kolejnych blędow. Strona wygląda tak jak powinna.

## Custom namespace

Co jeśli z jakiegoś powodu chcemy mieć kompletnie inny namespace ? Czy jesteśmy uwiązani z nazwą pliku ? 
Na szczęście nie. SASS umożliwia nam stworzenie  customowej przestrzeni nazw. 
Wygląda to mniej więcej w ten sposob:

```css
@use  './colors.scss' as kolorki; // nowy namespace

body {
    background-color: kolorki.$main-red; // nowy namespace w akcji !
}

```

## Możliwości konfiguracyjne

Kolejną przydatną ciekawostką płynącą z `@use` jest możliwość importowania pliku z dodatkowymi parametrami. Najlepiej zrozumieć to patrząc na przykład. Wróćmy na moment do pliku `colors.scss`

```css
$main-red: red !default;
$main-blue: blue !default;

// colors.scss
```

Co się zmieniło ? Jak już zapewne zauważyłeś, dodałem do każdej wartości dodatkową flagę `!default`. Tutaj zaczyna się zabawa. Korzystając z tej flagi mówimy "Chciałbym być w stanie zmienić te wartości podczas importowania mojego modułu ze stylami!"

W jaki sposób tego użyć? Jest to bardzo proste. 

```css
@use  './colors.scss' with (
    $main-red: teal,
    $main-blue: orangered
);

// main.scss
```

Wiem, ze powyższy zapis może się wydawać dziwny ale jego działanie jest bardzo proste. 
Pamietasz flagi `!default` z poprzedniego pliku ? One pozwliły nam zmienić wartość podczas importu. Dokladnie to robimy w powyższym snippecie. 

Kolor zmiennej `$main-red` chcemy zmienić na `teal`

Kolor zmiennej `$main-blue` chcemy zmienić na `orangered`

Kod kompiluje się bez problemu. Kolory zostaly zamienione na `teal` i `orangered`.

Co w przypadku, gdy mamy dodaną flagę `!default` do kilku wartości ale podczas importu nie chcemy nadpisac jednej z nich?
To rownież jest banalnie proste - wystarczy ją olać podczas importu modułu. Wówczas zastosowana zostanie domyślna wartość z pliku `colors.scss` widniejąca przed flagą `!default`. Rozważmy poniższy przykład:

```css
@use  './colors.scss' with (
    $main-red: teal,
);

// main.scss
```

Nadpisujemy wartość zmiennej `main-red` wartoscią `teal` (teal to taki zielonopodobny kolor). `Main-blue` rownież moglibyśmy nadpisać ale tego nie zrobilismy. W tym przypadku - jak już wspomniałem, zastosowany zostanie kolor widniejący obok flagi `!default`.


Innymi słowy - `$main-red: red !default;` można rozumieć jako ->  "Jesli podczas importu nie zostanie podana inna wartość - defaultuj do `red`"

## Prywatne właściwości

Co jeśli mamy plik z różnymi zmiennymi ale nie chcemy udostępniać niektórych  na zewnątrz ? Co jeśli jakaś zmienna jest przydatna tylko i wyłącznie w jednym pliku i inne jej nie potrzebują?

`@use` rozwiazuje rownież ten problem. Konfiguracja jest bardzo skomplikowana więc się skup. 
Przed nazwą zmiennej dodaj `-` lub `_`

Już. To wszystko : ) 

```css
$-main-red: red; // prywatna zmienna

// colors.scss
```

```css
@use  './colors.scss';

body {
    background-color: colors.$-main-red;
}

// main.scss
```
Rezultat: `Error: Private members can't be accessed from outside their modules.`

## Podsumowanie 

`@use` jest zdecydowanie dobrym krokiem  w kierunku rozwoju SASS-a. Nie dość, że rozwiązuje on dość istotne problemy, z którymi borykaliśmy się do tej pory to jeszcze jest bardzo prosty w implementacji i myślę, że migracja mniejszych (pod kątem styli) aplikacji nie powinna być bolesna.
Być może warto sprawdzić narzędzie do migracji ? 

<a href="https://sass-lang.com/documentation/cli/migrator" target="_blank">sass-lang.com/documentation/cli/migrator</a>

## Źródła


<a href="https://www.youtube.com/watch?v=CR-a8upNjJ0" target="_blank">youtube.com/watch?v=CR-a8upNjJ0</a>

<a href="https://sass-lang.com/documentation/at-rules/import" target="_blank">sass-lang.com/documentation/at-rules/import</a>

<a href="https://sass-lang.com/documentation/at-rules/use" target="_blank">sass-lang.com/documentation/at-rules/use</a>
