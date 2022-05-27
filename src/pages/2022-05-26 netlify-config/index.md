---
path: "/blog/netlify-config"
date: "2022-05-26"
title: "CI/CD z Netlify + React oraz CircleCi"
readTime: "10"
author: "Adam Knieć"
intro: "W tym wpisie stworzymy podstawową konfigurację CircleCi. Pozwoli to na zautomatyzowanie i zabezpieczenie deploymentu aplikacji"
description: "Podstawowa konfiguracja CircleCi i zautomatyzowany deployment"
tags: ["tools", "react"]
---

## Założenia wstępne

Aby wyciągnąć z tego wpisu maksymalną ilość informacji przy minimalnch nerwach polecam upewnić się, że spełniasz poniższe założenia:

- Podstawowa znajomość platformy GitHub
- Podstawowa znajomość platformy Netlify
- Minimalne zrozumienie idei CI/CD
- Podstawowa znajomość systemu kontroli wersji GIT

## Wprowadzenie

Rozwiązania CI-CD są praktycznie nieodłącznym elementem każdego projektu we współczesnym Web-Developmencie. Usprawniają one pracę zespołów developerskich przy pomocy automatyzacji powtarzalnych procesów i pozytywnie wpływają na ich bezpieczeństwo. Przykładem takiego usprawnienia może być blokowanie deploya na produkcję w przypadku pojawienia się błędów.

Teoretycznie jest to zadanie stricte Dev-Opsowe ale po pierwsze, nie w każdym projekcie będziemy mieli luksus posiadania speca od CI/CD, a po drugie - podstawowy setup naprawdę jest do ogarnięcia i nie ma się czego bać.

W tym wpisie postaramy się stworzyć bardzo podstawową integrację pomiędzy platformami CircleCi, GitHub oraz Netlify. Nie wyrzucę gotowego konfigu i nie mam też zamiaru opisać wszystkiego w kilku zdaniach. Zaczniemy od zera i krok po kroku zbudujemy mechanizm, który będzie wychwytywał każdego commita na gitHubie i triggerował odpowiedni workflow na CircleCi. Workflow ten będzie odpalał testy i w przypadku tych "failujących", zatrzyma proces deploymentu kodu na środowisko produkcyjne.

Poniższy wpis jest pierwszym z (prawdopodobnie) kilku, które dotyczyć będą setupu środowiska projektowego. Zapraszam!

## Stworzenie repozytorium i podstawowy setup (nudy)

Jak już zaznaczyłem na wstępie, zaczynamy od zera 😎. Zaloguj się na GitHuba i wyklikaj całkowicie nowe, świeże repo. W moim przypadku będzie się ono nazywało circlecireacttraining.

Kolejnym krokiem będzie sklonowanie powyższego repozytorium. Można do tego użyć komendy:

```bash
git clone https://github.com/AdamKniec/<nazwatwojegorepo>.git
```

Nie jest to żadna tajemna wiedza. Powyższa komenda będzie też widoczna po kliknięciu przycisku “Clone” na widoku repozytorium.

Żeby nie było wstydu, że tak pusto - zainstalujmy sobie podstawową Reactową aplikację. Odpal terminal i wejdź w nowe repo. Następnie wstukaj komendę:

```bash
npx create-react-app .
```
Zwróć uwagę, że w powyższej komendzie nie dodaliśmy nazwy aplikacji. Jeśli nie jesteś z nią zaznajomiony to niczym się nie przejmuj. Jedyne co ona robi to tworzy strukturę Reactowej aplikacji (src, public itp) wewnątrz folderu, z poziomu którego została uruchomiona.

Jeśli chcesz się upewnić, że wszystko jest ok to odpal aplikację przy pomocy komendy:

```bash
npm start
```

Twoim oczom powinna się ukazać działająca aplikacja, czyli w naszym przypadku obracające się logo Reacta.

Pierwszy etap za nami. Najwyższa pora wrzucić dotychczasowe zmiany na repozytorium. Na ten moment proponuję jeszcze wrzucać zmiany na główny branch “main”.

## Wyklikanie aplikacji w Netlify

- dodac ikonke netlify ?
- Zapowiecdziec jakos 2 czesc wpisu