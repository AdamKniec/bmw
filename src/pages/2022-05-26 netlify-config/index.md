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

Wejdź na stronę główna Netlify i stwórz darmowe konto. Bez tego nie będziemy w stanie ruszyć dalej. Jeśli jesteś na Netlify pierwszy raz to wspomnę tylko, że jest na platforma, na której będziemy hostować naszą aplikację.

Pierwszy krok to rozwinięcie dropdowna "Add new site" i wybranie opcji "Import an existing project". Kolejny etap to wybranie odpowiedniego "providera". Nasz kod jest na GitHubie więc automatycznie staje się to nasz główny wybór. 

<img src="../2022-05-26 netlify-config/imgs/provider.png" />

Kliknięcie przycisku GitHub spowoduje przejście do widoku wyboru repozytorium (jeśli jesteś już zalogowany do GitHuba lub uwierzytelniony za jego pomocą) lub  poprosi Cię o zalogowanie. Na ekranie powinna się pojawić lista z repozytoriami z Twojego GitHuba. W naszym przypadku wybieramy circlecireacttraining.

<img src="../2022-05-26 netlify-config/imgs/repository.png" />

Po wyborze  repo wylądujemy na ostatnim etapie podstawowej integracji z Netlify.

W polu "Build command" wpisz komendę, której używa React do budowania produkcyjnej wersji aplikacji czyli:

```bash
npm run build
```

W polu "Publish directory" wpisz nazwę folderu, który wykorzystany zostanie przez Netlify jako ten zawierający produkcyjną wersję aplikacji. W przypadku Reacta będzie to "build".


<img src="../2022-05-26 netlify-config/imgs/settings.png" />

Resztę pól pozostawiamy bez zmian i klikamy “Deploy Site”.

Wróć na główny dashboard Netlify. Jeśli jesteś szybki to w sekcji “Production Deploys” zobaczysz nowy wpis dotyczący Twojego builda ze statusem “Building”. Jeśli build zostanie zakończony to status powinien zmienić się na “Published”. 
 Na samej górze tego widoku zobaczysz wygenerowany dziwny link. Został on wygenerowany na podstawie jeszcze dziwniejszej (też wygenerowanej automagicznie) nazwy projektu na Netlify. Powinien on wyglądać mniej więcej tak:

https://randomowanazwa-f87a7hj.netlify.app

Kliknięcie w ten adres powinno przenieść Cię do  produkcyjnej wersji aplikacji! Jesteśmy już oficjalnie Live 💪

Jeszcze jedna szybka rzecz...

 Musimy doprecyzować w konfiguracji, który branch będzie u nas tym produkcyjnym. Otwórz projekt w Netlify a następnie "Site Settings" > "Build And deploy". Upewnij się, że Twoja konfiguracja wygląda następująco.

<img src="../2022-05-26 netlify-config/imgs/settings2.png" />

## Wyklikanie aplikacji w CircleCi

Zaloguj się do CircleCi. Jeśli nie masz konta to śmiało się zarejestruj - jest to całkowicie darmowe. 
Najszybszym sposobem logowania jest uwierzytelnienie za pomocą GitHuba.

Przejdź przez wszystkie kroki. Jeśli wszystko przejdzie zgodnie z planem to na dashboardzie CircleCi powinny się pojawić projekty z Twojego GitHuba. Powinno to wyglądać mniej więcej tak:

<img src="../2022-05-26 netlify-config/imgs/circledashboard.png" />

Klikamy "Set Up Project" obok nazwy naszego repo.

Pojawi się następujący widok:

<img src="../2022-05-26 netlify-config/imgs/ymlconfig.png" />

Opcja "Fastest" zakłada, że masz już w repozytorium plik config.yml. Plik ten służy do tworzenia instrukcji dla mechanizmów CircleCi. (Więcej na ten temat w późniejszym etapie wpisu). Nie mamy w naszym repozytorium takiego pliku więc zdecydujemy się na opcję ”Faster”. Wrzuci ona na nasze repo podstawową konfigrację CircleCi. Fajny bajer, nie? Klikamy w "Set Up Project".

Zostaniemy przekierowani do kolejnego widoku.

<img src="../2022-05-26 netlify-config/imgs/circleview.png" />

Czego możemy się tutaj dowiedzieć? Został stworzony nowy branch o nazwie circle-ci-project-setup. Został on wygenerowany przez CircleCi. Branch ten zawiera już konfigurację w pliku config.yml więc  automatycznie został wyłapany przez “Cyrkla” (tak czasami nazywa się CircleCi). Uruchomiony został również say-hello-workflow czyli testowy i bardzo prosty wokflow, którego znajdziemy w pliku konfiguracyjnym. 

Pole "Status" przechowuje dość oczywistą informację. W naszym przypadku nie było jeszcze żadnego problemu czego dowodem jest label "Success".

Wchodzimy na GitHuba. Nasze kolejne zadanie to stworzenie Pull requesta z  nowej, automatycznie wygenerowanej gałęzi.

PR będzie z "circleci-project-setup" do "main". Merguj gdy tylko będziesz gotowy :) 

Przejdźmy na chwilę na CircleCi. Zwróć uwagę, że teraz workflow odpalił się dla brancha main. Ma to sens bo dopiero co domergowaliśmy do niego nową konfigurację.


<img src="../2022-05-26 netlify-config/imgs/mainbranchcircle.png" />

Kolejnym krokiem będzie dodanie nieco konkretniejszej konfiguracji w pliku config.yml.

Początkowa jej wersja będzie wyglądać następująco:

```bash
version: 2.1
orbs:
  node: circleci/node@4.7.0

jobs:
  test:
    docker:
      - image: cimg/node:17.2.0
    steps:
      - checkout
      - node/install-packages:
          pkg-manager: npm
      - run:
          command: npm test
          name: Run tests

  build:
    docker:
      - image: cimg/node:17.2.0
    steps:
      - checkout
      - node/install-packages:
          pkg-manager: npm
      - run:
          command: npm run build
          name: Build app
      - persist_to_workspace:
          root: ~/project
          paths:
            - .
  
workflows:
  test_my_app:
    jobs:
      - test
      - build

```

- dodac ikonke netlify ?
- Zapowiecdziec jakos 2 czesc wpisu
- fix data
- zminifikowac obrazki