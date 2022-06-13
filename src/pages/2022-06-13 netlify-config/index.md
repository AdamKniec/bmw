---
path: "/blog/netlify-circle-react"
date: "2022-06-13"
title: "CI/CD z Netlify + React oraz CircleCi"
readTime: "10"
author: "Adam Knieć"
intro: "W tym wpisie stworzymy podstawową konfigurację CircleCi dla projektu. Pozwoli to na zautomatyzowanie i zabezpieczenie deploymentu aplikacji"
description: "Podstawowa konfiguracja CircleCi i zautomatyzowany deployment na platformę Netlify"
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

<img src="../2022-06-13 netlify-config/imgs/provider.png" />

Kliknięcie przycisku GitHub spowoduje przejście do widoku wyboru repozytorium (jeśli jesteś już zalogowany do GitHuba lub uwierzytelniony za jego pomocą) lub  poprosi Cię o zalogowanie. Na ekranie powinna się pojawić lista z repozytoriami z Twojego GitHuba. W naszym przypadku wybieramy circlecireacttraining.

<img src="../2022-06-13 netlify-config/imgs/repository.png" />

Po wyborze  repo wylądujemy na ostatnim etapie podstawowej integracji z Netlify.

W polu "Build command" wpisz komendę, której używa React do budowania produkcyjnej wersji aplikacji czyli:

```bash
npm run build
```

W polu "Publish directory" wpisz nazwę folderu, który wykorzystany zostanie przez Netlify jako ten zawierający produkcyjną wersję aplikacji. W przypadku Reacta będzie to "build".


<img src="../2022-06-13 netlify-config/imgs/settings.png" />

Resztę pól pozostawiamy bez zmian i klikamy “Deploy Site”.

Wróć na główny dashboard Netlify. Jeśli jesteś szybki to w sekcji “Production Deploys” zobaczysz nowy wpis dotyczący Twojego builda ze statusem “Building”. Jeśli build zostanie zakończony to status powinien zmienić się na “Published”. 
 Na samej górze tego widoku zobaczysz wygenerowany dziwny link. Został on wygenerowany na podstawie jeszcze dziwniejszej (też wygenerowanej automagicznie) nazwy projektu na Netlify. Powinien on wyglądać mniej więcej tak:

https://randomowanazwa-f87a7hj.netlify.app

Kliknięcie w ten adres powinno przenieść Cię do  produkcyjnej wersji aplikacji! Jesteśmy już oficjalnie Live 💪

Jeszcze jedna szybka rzecz...

 Musimy doprecyzować w konfiguracji, który branch będzie u nas tym produkcyjnym. Otwórz projekt w Netlify a następnie "Site Settings" > "Build And deploy". Upewnij się, że Twoja konfiguracja wygląda następująco.

<img src="../2022-06-13 netlify-config/imgs/settings2.png" />

## Wyklikanie aplikacji w CircleCi

Zaloguj się do CircleCi. Jeśli nie masz konta to śmiało się zarejestruj - jest to całkowicie darmowe. 
Najszybszym sposobem logowania jest uwierzytelnienie za pomocą GitHuba.

Przejdź przez wszystkie kroki. Jeśli wszystko przejdzie zgodnie z planem to na dashboardzie CircleCi powinny się pojawić projekty z Twojego GitHuba. Powinno to wyglądać mniej więcej tak:

<img src="../2022-06-13 netlify-config/imgs/circledashboard.png" />

Klikamy "Set Up Project" obok nazwy naszego repo.

Pojawi się następujący widok:

<img src="../2022-06-13 netlify-config/imgs/ymlconfig.png" />

Opcja "Fastest" zakłada, że masz już w repozytorium plik config.yml. Plik ten służy do tworzenia instrukcji dla mechanizmów CircleCi. (Więcej na ten temat w późniejszym etapie wpisu). Nie mamy w naszym repozytorium takiego pliku więc zdecydujemy się na opcję ”Faster”. Wrzuci ona na nasze repo podstawową konfigrację CircleCi. Fajny bajer, nie? Klikamy w "Set Up Project".

Zostaniemy przekierowani do kolejnego widoku.

<img src="../2022-06-13 netlify-config/imgs/circleview.png" />

Czego możemy się tutaj dowiedzieć? Został stworzony nowy branch o nazwie circle-ci-project-setup. Został on wygenerowany przez CircleCi. Branch ten zawiera już konfigurację w pliku config.yml więc  automatycznie został wyłapany przez “Cyrkla” (tak czasami nazywa się CircleCi). Uruchomiony został również say-hello-workflow czyli testowy i bardzo prosty wokflow, którego znajdziemy w pliku konfiguracyjnym. 

Pole "Status" przechowuje dość oczywistą informację. W naszym przypadku nie było jeszcze żadnego problemu czego dowodem jest label "Success".

Wchodzimy na GitHuba. Nasze kolejne zadanie to stworzenie Pull requesta z  nowej, automatycznie wygenerowanej gałęzi.

PR będzie z "circleci-project-setup" do "main". Merguj gdy tylko będziesz gotowy :) 

Przejdźmy na chwilę na CircleCi. Zwróć uwagę, że teraz workflow odpalił się dla brancha main. Ma to sens bo dopiero co domergowaliśmy do niego nową konfigurację.


<img src="../2022-06-13 netlify-config/imgs/mainbranchcircle.png" />

## Konfiguracja CircleCi z poziomu kodu

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
Powyższa konfiguracja prawdopodobnie nie jest idealna ale zdecydowanie nada się na początek naszej zabawy z CircleCi. Składa się z podstawowych instrukcji oraz tkzw. “jobów” - czyli zadań, które powinny zostać wykonane w określonej kolejności.

Pamiętajmy, że chcemy aby nasz pipeline był w stanie odpalić testy, zbudować produkcyjną wersję aplikacji i zdeployować kod na konkretnego brancha.

Dla przykładu - jeben z jobów nazywa się `test`. Określamy w nim, na jakiej wersji Node-a ma się wykonać dana operacja, z jakiego managera pakietów korzystamy (npm) i jaka konkretnie komenda ma się wykonać.
W tym przypadku będzie to  `“npm test”`.

Step `build` działa i wygląda analogicznie.

Na samym końcu naszej konfiguracji określamy `workflow` - czyli informujemy CircleCI, które ze zdefiniowanych wcześniej jobów mają się wykonać i w jakiej kolejności. 
W naszym przypadku - definiujemy joba o nazwie `test_my_app` i każemy mu odpalić testy a zaraz po nich build aplikacji. 

No dobra, czas sprawdzić czy to zadziała. Zacommituj nowe zmiany na brancha.

Wchodzimy na CircleCi. Powinieneś zastać podobny rezultat:

<img src="../2022-06-13 netlify-config/imgs/new-workflow.png" />

Elegancko! Workflow się odpalił, konkretne joby również. Nie dostaliśmy żadnego błędu. No dobra ale śmierdzi tu troche jakimś "false positivem". Zobaczmy, czy circleCi wyłapie błąd w teście. 

Boilerplate zostawiony przez crete-react-app ma w sobie plik, który możemy wykorzystać. Nazywa się `App.test.js`.
Jeśli nie ma takiego pliku -  dodaj jakikolwiek z odpowiednim dla testów rozszerzeniem.

Niech wygląda następująco:

```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Build z testem powinien się wywalić!/i);
  expect(linkElement).toBeInTheDocument();
});
```

Test zakłada, że na stronie znajduje się napis "Build z testem powinien się wywalić". Tego napisu oczywiście nie ma. Zacommituj te zmiany i zobaczmy czy Cyrkiel zareaguje.

Jak mawia klasyk - “Operation failed succesfully”. Job `test` się wywalił. Klikając w niego zobaczysz logi. Błąd brzmi następująco:

    TestingLibraryElementError: Unable to find an element with the text: /Build z testem powinien się wywalić!/i. This could be because the text is broken up by multiple elements. In this case, you can provide a function for your text matcher to make your matcher more flexible.

Ma to sens :) Taki właśnie efekt chcieliśmy osiągnąć. Mamy teraz dowód, że CircleCi faktycznie powoli zaczyna wnosić jakąś wartość. Cofnij zmiany z zesputym testem i wrzuć ponownie na brancha. Zaraz zajmiemy się dalszymi krokami.

Zajmijmy się teraz kwestią deploya na platformę Netlify. Aby było to możliwe, musimy dokonać kilka zmian w konfigutacji pliku `config.yml`. Gotowy plik wygląda następująco:

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
  deploy: # this can be any name you choose
    docker:
      - image: cimg/node:17.2.0
    steps:
      - attach_workspace:
          at: ~/project
      - run:
          name: Deploy to Netlify
          command: ./node_modules/.bin/netlify deploy --site $NETLIFY_SITE_ID --auth $NETLIFY_ACCESS_TOKEN --prod --dir=build

workflows:
  test_my_app:
    jobs:
      - test
      - build
      - deploy:
          requires:
            - build
            - test
          filters:
            branches:
              only: main # only deploy when on main
```

Zwróćmy uwagę na konfigurację na dole pliku: 

```bash
workflows:
  test_my_app:
    jobs:
      - test
      - build
      - deploy:
          requires:
            - build
            - test
          filters:
            branches:
              only: main # only deploy when on main
```


Po jobie `build` uruchamiamy  kolejny job o nazwie `deploy`. Do poprawnego działania potrzebuje on zakończenia kroków zawartych w instrukcji “requires”. W przeciwnym razie krok deploy nie zadziała. Instrukcja `filters` informuje Cyrkla, z jakiego konkretnie brancha chcemy deployowac. W naszym przypadku będzie to main. 

Kolejną zmianą w konfiguracji jest nowy job sam w sobie. Wygląda on tak:

```bash
deploy: # this can be any name you choose
    docker:
      - image: cimg/node:17.2.0
    steps:
      - attach_workspace:
          at: ~/project
      - run:
          name: Deploy to Netlify
          command: ./node_modules/.bin/netlify deploy --site $NETLIFY_SITE_ID --auth $NETLIFY_ACCESS_TOKEN --prod --dir=build
```

Najważniejsza jest komenda wykonywana na samym końcu joba. Jak pewnie zauważyłeś, zawiera ona w sobie dwie zmienne, o których wcześniej nie wspominałem. Zmienne te przechowują dane o twojej stronie i dane uwierzytelniające, które porzebne są do poprawnego wykonania tej komendy. 

No okej, ale gdzie one są? Gdzie je znaleźć? Gdzie mam je dodać?
Spokojnie, zacznijmy od początku.

**Aby zlokalizować SiteId:**
- Odpal Netlify
- Wybierz projekt, który stworzyliśmy
- W górnej nawigacji wybierz Site Settings
- Znajdź SiteId 

Okej, jedno z głowy. Czas na **Netlify Access Token**: 
- Odpal Netlify
- Kliknij na ikonkę swojego profilu w prawym, górym rogu
- Wybierz User Settings
- Po lewej stronie wybierz Applications
- W sekcji `Personal access token` wygeneruj nowy token. Nadaj mu nazwę i skopiuj jej wartość. Będzie zaraz potrzebna. Jest to istotne bo drugi raz nie będzie jej już można zobaczyć.


Sukces!

 Nasze zmienne mamy przygotowane. Pozostaje pytanie - gdzie je wrzucić. Cóż, zastanówmy się na jakim etapie będzie ta komenda wykonywana.
Przyda nam się ona dopiero na etapie wykonywania naszego pipeline-a przez CircleCI więc to Cyrkiel musi mieć do niech dostęp.

**Dodawanie zmiennych środowiskowych w CircleCi:**
- Odpal CircleCi
- W lewej nawigacji wybierz "Projects"
- Wybierz nasz projekt
- Kliknij "Project Settings" w prawym, górnym rogu
- Wybierz "Environment Variables" w lewej nawigacji
- Kliknij "Add new variable" i dodaj odpowiednie wartości. Pamiętaj tylko, żeby ich nazwa odpowiadała tym w komendzie z joba, ktorego mamy w konfiguracji


Good job! Jesteśmy prawie na mecie. Fajnie by było w końcu zobaczyć efekt naszych prac. Zanim to nastąpi - wykonajmy ostatni krok. Zainstalujmy Netlify CLI. Ta paczka jest potrzebna aby CircleCi był w stanie wykonać komendę odpowiedzialną za deploy naszej aplikacji do Netlify.

```bash
npm install --save-dev netlify-cli

```

Po zainstalowaniu paczki, wrzuć wszystko na repo. Pora sprawdzić co się z tego urodzi!

Oto efekt na CircleCi:
<img src="../2022-06-13 netlify-config/imgs/circle-new-settings.png" />

Tak jest! Pojawił się nasz nowy step, a co najważniejsze - nawet się nie wypieprzył. No dobra ale to tylko circleCi. Zobaczmy czy deploy faktycznie został zarejestrowany przez Netlify.

Otwórz Netlify, wejdź w nasz projekt i kliknij w zakladkę Deploys.

<img src="../2022-06-13 netlify-config/imgs/deploy.png" />

Oto i on! Cały na biało. Nasz deploy!

No dobra, fajnie ale czemu są jakieś dwa dziwne wpisy? Nie powinien być jeden?

No powinien ☹️. Zatrzymajmy się na chwilę. Dlaczego widzimy dwa wpisy? Przecież Cyrkiel triggeruje deploy na Netlify, czy zrobiliśmy gdzieś bląd? I tak i nie. Problem polega na tym, że nasz Netlify jest połączony z naszym GitHubem i ma ustawiony branch main jako galąź produkcyjną. Domyślnie, w takiej konfiguracji, Netlify sam z siebie odpali deployment z produkcyjnego brancha za każdym razem, gdy coś do niego zmergujemy / zacommitujemy. 
W skrócie - jeden z naszych deployów został zainicjowany z poziomu CircleCi a drugi został odpalony przez Netlify. Nie może tak zostać bo jeśli przykładowo jakiś test będzie się wywalać to Cyrkiel go ładnie wyłapie i przerwie proces. Netlify niestety opublikuje kod tak czy inaczej. 

Jest na to obejście. Stworzymy na GitHubie śmieciowego brancha i ustawimy go jako branch produkcyjną w Netlify. Konfiguracja CircleCi pozostanie bez zmian. Bedzie to wyglądało tak:

Kod mergujemy na main-a  a następnie...
  
  → Zmiana wyłapana przez CircleCi → Trigger deploya → Netlify 

  → Zmiana wyłapana przez Netlify → Trigger deploya → Deployment na śmieciowego brancha

  Tym sposobem właściwy deployment będzie triggerowany tylko za pośrednictwem CircleCi. Deployment inicjowany  przez Netlify trafi do śmieci.

  Po pierwsze - trzeba stworzyć naszego śmieciowego brancha. W tym celu odpal GitHuba i stwórz nową gałąź z maina i nazwij ją tak aby nikt nie miał wątpliwość do czego służy. 
  W moim przypadku będzie to:

`deploy-black-hole`

Następnie, zmienimy konfigurację Netlify aby deploye lądowały na nowym branchu.
- Odpal Netlify
- Wybierz projekt
- Deploys -> Deploys Settings

Twoja konfiguracja powinna wyglądać podobnie jak na poniższym przykładzie.

<img src="../2022-06-13 netlify-config/imgs/netlify-more-config.png" />

Nasza przygoda z podstawową konfiguracją powoli dobiega końca. Pozostaje przetestowanie całości. Dokonaj prostej zmiany tekstowej w apikacji, pusznij zmiany na repozytorium. Upewnij się, że workflow na CircleCi przeszedł bez żadnego problemu. Po zakończonym procesie na Cyrklu, sprawdź czy jesteś w stanie zobaczyć  czy deploy przez niego triggerowany  został wychwycony przez Netlify. Na sam koniec  upewnij się, że po odwiedzeniu linka prowadzącego do wyhostowanej aplikacji, dostępnego na Netlify jesteś w stanie zobaczyc zmiany, które przed chwilą wprowadziłeś. 

Upewnijmy się też, że negatywna ścieżka też jest obsłużona poprawnie. Wróć jeszcze na chwilę do kodu. Wprowadź   zmianę tekstową ale przy tym zepsuj rownież test. Chcemy sprawdzić, czy Cyrkiel przerwie proces I czy powstrzyma deployment. 

Oto zepsuty test:

```javascript

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Build z testem powinien się wywalić!/i);
  expect(linkElement).toBeInTheDocument();
});
```
Zacommituj  zmianę na repozytorium i obserwuj zachowanie CircleCi. Powinien się wywalić na teście i  zatrzymać proces deploymentu. Jeśli wejdziesz w wyhostowaną aplikację przez Netlify to najnowsza zmiana tekstowa nie powinna być widoczna.

## Podsumowanie

Udało nam się zrobić naprawdę dużo rzeczy. Stworzyliśmy podstawę konfiguracji projektu opartego na React, Netlify i CircleCi. Połączyliśmy ze sobą te narzędzia i stworzyliśmy pipeline, który usprawnia bezpieczeństwo naszej aplikacji i automatyzuje deployment. Każdy push na repozytorium jest wychwytywany przez CircleCi. Ten z kolei triggeruje joby, które spełniają określone zadania. One również są ze sobą powiązane bo ostatni krok - deployment,  nie zostanie uruchomiony jeśli testy z poprzedniego kroku wychwycą błąd. 



W planie mam nastepną część wpisu, która będzie dotyczyła podobnego tematu więc obserwuj bloga :) Stay tuned!

Projekt, na podstawie którego tworzyłem ten wpis znajdziesz pod poniższym linkiem:

<a href="https://github.com/AdamKniec/circlecireacttraining" target="_blank" rel="noopener" >https://github.com/AdamKniec/circlecireacttraining</a>

## Źródła
<a href="https://circleci.com/blog/react-netlify-deploy/?utm_source=google&utm_medium=sem&utm_campaign=sem-google-dg--emea-en-dsa-maxConv-auth-brand&utm_term=g_-_c__dsa_&utm_content=&gclid=CjwKCAjwx46TBhBhEiwArA_DjMsMuvd-sStTj9ty04sAYocwdBbiLuwKMTXEmlbbCs84PmUTZKqSsBoCk8cQAvD_BwE" target="_blank" rel="noopener noreferrer" >https://circleci.com/blog/react-netlify-deploy/</a>


<a href="https://circleci.com/docs/" target="_blank" rel="noopener" >https://circleci.com/docs/</a>

