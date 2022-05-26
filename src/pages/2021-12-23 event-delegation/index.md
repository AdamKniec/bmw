---
path: "/blog/event-delegation"
date: "2021-12-23"
title: "Event Delegation"
author: "Adam Knieć"
intro: "W czasach niekończącej się gonitwy frameworków zdarza się zapomnieć o podstawowych mechanizmach JS-a. W tym wpisie postaram się w jasny i prosty sposób wyjaśnić jak działa i jak wykorzystać event delegation."
description: "Event Delegation - korzyści i praktyczne zastosowanie"
tags: ["js"]
---

## Założenia wstępne

- Podstawowa znajomość składni JS
- Podstawowa znajomość mechanizmów JS-a (funkcje, eventy, zmienne)

## Wprowadzenie

Na każdym blogu zw. z programowaniem główną rolę grają frameworki. Jest to całkowicie zrozumiałe. Znaczna większość projektów, nad którymi przyjdzie nam w tych czasach pracować będzie oparta na tego typu rozwiązaniach. Minusem jest to, że młodzi inżynierowie często zabierają się za frameworki kompletnie nie znając genezy ich powstania i problemów jakie rozwiązują. Pomyślałem, że pójdę trochę “pod prąd”, zrobię kilka kroków wstecz i omówię mechanizm czystego JS-a (w połączeniu z API przegladarki rzecz jasna :) ) .Prawdopodobnie pojawi się na tym blogu więcej wpisów dot. czystego JS-a.

## Problem

Załóżmy, że dostałeś w pracy do zrobienia nowe zadanie. Masz stworzyć aplikację, która wyświetli trzy imiona naukowców. Kliknięcie w naukowca zmieni jego kolor na czerwony. Proste! Dodatkowy plus jest taki, że lista ta będzie przedstawiać nazwiska wybitnych biologów i epidemiologów, którzy zabłysnęli wiedzą podczas pandemii COVID-19 więc przy okazji nauczymy się czegoś konkretnego.

Otwierasz IDE, instalujesz Reacta, renderujesz paragrafy, każdy ma swojego onClicka, życie jest piękne. Niesety nie tym razem. W komentarzu w Jirze widzisz informację, że aplikacja ma być w całości stworzona przy pomocy czystego JS-a. No dobra, damy rade!

Udało nam sie stworzyć następujący kod

```html
<div>
  <p>Edyta Górniak</p>
  <p>Ivan Komarenko</p>
  <p>Marcin Najman</p>
</div>
```

```js
const allScientists = document.querySelectorAll("p");

allScientists.forEach((scientist) => {
  scientist.addEventListener("click", () => {
    scientist.style.color = "red";
  });
});
```

W HTML-u stworzyliśmy element `div` zawierający trzy paragrafy. Każdy z nich przedstawia imię i nazwisko naukowca.

Stworzony przez nas skrypt pobiera przy pomocy metody `querySelectorAll` "NodeListę" wszystkich paragrafów. Mapuje się po tej liście i każdemu z paragrafów przypisuje obslugę eventu `click`. Podczas kliknięcia w danego naukowca, jego godność zostanie przemalowana na czerwono. Wszystko działa i kolejne nazwiska zmieniają style wraz z kliknięciami myszki. Elegancko.

Jak to zazwyczaj bywa - można to zrobić lepiej. Jaki jest problem z powyższym rozwiązaniem?
Najłatwiej doświadczyć problemu na własnej skórze. Powiedzmy, że wraz z rozwojem aplikacji pojawiło się nowe wymaganie. Chcemy stworzyć przycisk, który po kliknięciu doda kolejny element listy. Postarajmy się to zaimplementować.

```html
<div class="wrapper">
  <p>Edyta Górniak</p>
  <p>Ivan Komarenko</p>
  <p>Marcin Najman</p>
</div>
<button class="button">Dodaj naukowca</button>
```

```js
const allScientists = document.querySelectorAll("p");
const button = document.querySelector(".button");
const wrapper = document.querySelector(".wrapper");

const handleAddListItem = () => {
  const p = document.createElement("p");
  p.innerText = "Jerzy Zięba";
  wrapper.appendChild(p);
};
button.addEventListener("click", handleAddListItem);

allScientists.forEach((scientist) => {
  scientist.addEventListener("click", () => {
    scientist.style.color = "red";
  });
});
```

Pobraliśmy nasz nowy przycisk. Kliknięcie w niego wywołuje funkcję `handleAddListItem`. Funkcja ta tworzy nowy paragraf i w jego node tekstowy wpisuje Jerzego Ziębę. Ostatnim krokiem jest dodanie do wrappera naszego nowego paragrafu korzystając z metody `appendChild`.

Nowy button wydaje się działać. Kliknięcie powoduje dodanie Jerzego do listy.
Task ogarnięty. Robisz PR-a, sam go sobie sprawdziłeś, mergujesz i przesuwasz go na Jirze do “QA Ready”. Po jakimś czasie odświeżasz swoją tablicę i widzisz, że QA zwrócił Twoje zadanie z powrotem do “InProgress” z informacją o niepoprawnej implementacji.

Odpalasz kod ponownie i zauważasz, że faktycznie kliknięcie i dodanie Jerzego (a nawet kilku!) działa, ale kliknięcie w niego nie powoduje zmiany kolory na czerwony, tak jak ma to miejsce w przypadku pierwszych trzech naukowców.

Dlaczego tak się stało?

Powodem jest to, że nie przypisaliśmy do paragrafu odpowiedniego event handlera. To jest duży minus tego typu rozwiązania. Jest mało elastyczne i dynamiczne dodawanie nowych elementów listy wymaga małej zmiany. Tak musiałaby wyglądać funkcja `handleAddListItem` żeby zagwarantować takie samo działanie jak w przypadku innych naukowców.

```js
const handleAddListItem = () => {
  const p = document.createElement("p");
  p.addEventListener("click", () => {
    p.style.color = "red";
  });
  p.innerText = "Jerzy Zięba";
  wrapper.appendChild(p);
};
```

Jak już zapewne zauważyłeś sam - jest to dość paskudne powielenie kodu. Mamy już dwa miejsca, w których “doczepiamy” obsługę eventów do naszych paragrafów. Na szczęście istnieje bardziej eleganckie rozwiązanie (tak, to w końcu będzie event delegation :) ).

Zacznijmy od początku. W pierwszym kroku chcemy uzyskać efekt podobny do tego, który mieliśmy przed implementacją przycisku. Na ten moment chcemy tylko kolorować naukowca na czerwowno po kliknięciu . Tym razem wykorzystajmy mechanizm `event delegation`

```html
<div class="wrapper">
  <p>Edyta Górniak</p>
  <p>Ivan Komarenko</p>
  <p>Marcin Najman</p>
</div>
```

```js
const wrapper = document.querySelector(".wrapper");

const handleClick = (e) => {
  if (e.target.nodeName !== "P") return;
  e.target.style.color = "red";
};

wrapper.addEventListener("click", (e) => handleClick(e));
```

Powyżej udało nam sie uzyskać oczekiwany efekt. Kliknięcie powoduje dodanie dodatkowego stylu z kolorem czerwonym. Dochodzimy teraz do "clue" tego wpisu. Czym tak naprawdę jest event delegation? Tłumaczenie na Polski w tym przypadku jest całkiem pomocne w zrozumieniu idei.

Delegacja zdarzenia.

Czym jest delegacja? Każdy z korporacyjnym doświadczeniem wie, że zazwyczaj przełożony deleguje zadania do wykonania swoim podwładnym. Podobna sytuacja jest w przypadku delegowania obsługi zdarzeń w drzewie DOM.

Idea jest taka, że zamiast przypisywać wielu elementom dokładnie ten sam mechanizm obsługujący zdarzenie - przypisujemy to zadanie (delegujemy) do wspólnego przodka tych elementów.

Aby dokładniej zrozumieć zagadnienie - przeanalizujemy kod. Jak widzisz na powyższym snippecie, kodu jest znacznie mniej. Po pierwsze jedyne co pobieramy z drzewa DOM to referencja do wspólnego przodka paragrafów - czyli diva z klasą `wrapper`.
Kolejny krok jest widoczny w ostatniej linijce snippetu. Do wrappera przypisujemy event listener “click” i powiązaną z nim funkcję handleClick. Oczywiście należy pamiętać o przekazaniu eventu (e) do tej funkcji.

Funkcja ta zobrazuje nam siłę płynącą z tego rozwiązania. Wykorzystujemy w niej przekazany uprzednio obiekt zdarzenia “e”. Cały mechanizm opiera się na tym jakich informacji ten obiekt nam dostarcza. Znajdziemy w nim między innymi informację, w jaki konkretnie element w drzewie DOM kliknęliśmy i na podstawie tego jesteśmy w stanie zbudować dalsze działanie skryptu.

Przeanalizujmy poniższą linijkę. To od niej zaczyna się działanie funkcji `handleClick`.

```js
if (e.target.nodeName !== "P") return;
```

Chcemy sprawdzić czy kliknięty element jest tym, którego kolor jest modyfikowany. Jak do tego podejść? Obiekt `e.target` ma wiele informacji na temat klikniętego elementu. Jedną z nich jest property `nodeName`. Oznacza to, że jesteśmy w stanie odczytać w jaki konkretnie rodzaj elementu kliknęliśmy. Tak sie sklada, że nasi naukowcy mają element wspólny - są zamknięci w paragrafach. Możemy ten fakt wykorzystać.

W powyższym snippecie sprawdzamy czy klikniety element NIE JEST paragrafem. Jeśli nie jest - nie chcemy zrobić nic. Ma to sens bo faktycznie nie planujemy reagowac na taką sytuację. Interesują nas tylko paragrafy.

Przechodząc dalej wewnątrz naszej funkcji

```js
e.target.style.color = "red";
```

obsługujemy przypadek “else” czyli sytuację, gdy jednak klikniemy w paragraf z naukowcem. W tym przypadku - do klikniętego elementu “e.target” przypisujemy nowy kolor. To wszystko. Skrypt działa i kliknięcie w naukowca znów zmienia jego kolor. Udało się to zrobić przy pomocy mechanizmu `event delegation`.

Na ten moment widzimy takie korzyści jak czytelność i zredukowana złóżoność kodu. Nie mamy żadnej pętli i przypisujemy tylko jeden event handler.

Kolejną zaletę zauważymy podczas implementacji naszego brakującego ficzera dodającego do listy Jerzego.

Zobaczmy jak będzie on wyglądał dzięki użyciu event delegation.

```html
<div class="wrapper">
  <p>Edyta Górniak</p>
  <p>Ivan Komarenko</p>
  <p>Marcin Najman</p>
</div>
<button class="button">Dodaj</button>
```

```js
const wrapper = document.querySelector(".wrapper");
const button = document.querySelector(".button");

const handleListItemClick = (e) => {
  if (e.target.nodeName !== "P") return;
  e.target.style.color = "red";
};

const handleButtonClick = () => {
  const p = document.createElement("p");
  p.innerText = "Jerzy Zięba";
  wrapper.appendChild(p);
};

button.addEventListener("click", handleButtonClick);
wrapper.addEventListener("click", (e) => handleListItemClick(e));
```

## Podsumowanie

Gdy porównamy oba rozwiązania: z i bez event delegation to szybko zauważymy, że kod oparty o ten mechanizm jest bardziej elastyczny, odporny na błędy i łatwiejszy w rozwijaniu. Funkcja dodająca elementy po kliknięciu tworzy tylko nowy paragraf i dokleja go do wrappera w drzewie DOM. Dla porównania, ta sama funkcja bez event delegation musiała jeszcze przypisać event do nowo tworzonego elementu.

Jeśli byłeś na tyle dociekliwy, żeby w Twojej głowie pojawiło się pytanie “Jak to się dzieje, że kliknięcie w paragraf triggeruje event na elemencie div?” to gratuluję dociekliwości 🙂 Dzieje się tak za sprawą mechanizmu zwanego `event bubbling`. Nie jest to temat tego wpisu i zdecydowanie go poruszę w przyszłości ale dla zainteresowanych zostawiam kilka pojęć, które również mogą was zainteresować. Zdecydowanie warto je znać i są one mocno powiązane z tematem tego wpisu.

- event propagation
- event capturing
- event bubbling
- event target phase

## Przydatne linki

<a href="https://javascript.info/event-delegation" target="_blank">javascript.info/event-delegation</a>

<a href="https://stackoverflow.com/questions/1687296/what-is-dom-event-delegation" target="_blank">stackoverflow.com/questions/1687296/what-is-dom-event-delegation</a>

<a href="https://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing" target="_blank">stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing</a>

<a href="https://javascript.info/bubbling-and-capturing" target="_blank">javascript.info/bubbling-and-capturing</a>
