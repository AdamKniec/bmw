---
path: "/blog/yup-formik"
date: "2021-12-06"
title: "Formik + Yup"
readTime: "10"
author: "Adam Knieć"
intro: "Połącznie bibliotek Yup i Formik sprawia, że tworzenie i obsługa formularzy w React staje się znacznie przyjemniejsze. W tym wpisie dowiemy się jak z nich korzystać."
description: "Znacznie łatwiejsze formularze dzięki bibliotekom Yup i Formik"
tags: ["tools"]
---

## Założenia wstępne

- Podstawowa umiejętność pracy i sprawnego poruszania się w ekosystemie React
- Umiejętność postawienia aplikacji korzystając z React CLI

## Problem

Lubisz kodzić formularze? Ja też nie.
Zwłaszcza w React-cie.
Prawdopodobnie spowodowane to jest tym, że często gdy muszę napisać jakąś funkcjonalność i wiem dobrze, że pierwszym krokiem powinna być instalacja odpowiednich bibliotek, w mojej głowie pojawia się pytanie "Może jednak uda się to ograć bez dodatkowej libki?".
Cóż - zdarzało się, że zaprowadziło mnie to na właściwe tory, ale w większości przypadków okazywało się to stratą czasu i wymyślaniem koła na nowo. Idealnym przykładem takiej sytuacji są formularze. Pewnego pięknego dnia gdy na mojej Jirze pojawił się task polegający na stworzeniu formularza i podstawowej walidacji postanowiłem od razu rzucić się na najpopularniejsze libki. Padło na `Formik-a` i `Yup`.

Moje życie stało się piękniejsze.
Jeśli czyta to ktoś z zapędami masochistycznymi i lubi od czasu do czasu pobawić się w formularze bez biblioteki lub ktoś kto po prostu jest "alty-libkowy" to zapraszam serdecznie do poniższego wpisu. Stworzymy prosty formularz, korzystając z wyżej wymienionych bibliotek.

## Instalacja

Stwórz podstawowy projekt korzystając z React CLI (Create React App).

Gdy aplikacja się wygeneruje - zainstaluj poniższe paczki.

```bash
npm install formik --save
```

```bash
npm install -S yup
```

## Podstawowe style (opcjonalnie)

Nie ma nic brzydszego niż nieostylowany formularz więc wciągniemy też do projektu style `Bootstrap-a`. Robię to najszybszym możliwym sposobem, który niekoniecznie jest najlepszy ale stylowanie i Bootstrap nie są w tym wpisie ważne.

Jeśli chcesz uzyskać taki sam efekt wizualny to w pliku `index.html` dodaj poniższy skrypt. Jest to `cdn` zminifikowanych styli bootstrapa.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
  integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
  crossorigin="anonymous"
/>
```

Stworzyłem też plik `form.css`, który później będzie importowany w pliku komponentu formularza. Oto jego zawartość:

```css
label {
  margin-top: 50px;
}
button {
  margin-top: 30px;
}
form {
  width: 400px;
  margin: 0 auto;
}
```

## Komponent formularza

W folderze `/src` stwórz plik `Form.js`. Wstępnie niech wygląda tak:

```jsx
import "../src/form.css"; -> importujemy nasze style

export const FormikForm = () => {
  return <p>Formularz</p>;
};

```

Jeśli otworzysz przeglądarkę na "localhoście" to powinieneś widzieć paragraf z treścią "Formularz".

Zacznijmy wgryzać się w Formikowe komponenty. Na ten moment nie mamy jeszcze nawet podstawowego znacznika form w naszym drzewie dom. Zróbmy coś z tym.

```jsx
import { Formik, Form } from "formik";
import "../src/form.css";

export const FormikForm = () => {
  return (
    <Formik>
      <Form></Form>
    </Formik>
  );
};
```

To jest wstęp naszego bolierplate-u. Baza, od której zaczynasz pracę z Formikiem.
Komponent `Formik` daje nam dostęp do całej magii, którą zaraz Ci pokażę, a `Form` tworzy w markupie znacznik `<form>`. Możesz to zweryfikować w narzędziach developerskich.
Kolejnym krokiem jest dodanie odpowiednich pól.

```jsx
import { Formik, Form, Field } from "formik";
import "../src/form.css";

export const FormikForm = () => {
  return (
    <Formik>
      <Form>
        <div>
          <label htmlFor="nameSurname">Imię i Nazwisko</label>
          <Field type="text" id="nameSurname" className="form-control" />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <Field type="text" id="email" className="form-control" />
        </div>
        <div>
          <label htmlFor="gender" className="form-check-label">
            Płeć
          </label>
          <div className="radio-wrapper form-check">
            <div>
              <Field
                type="radio"
                name="gender"
                value="M"
                className="form-check-input"
              />
              M
            </div>
            <div>
              <Field
                type="radio"
                name="gender"
                value="K"
                className="form-check-input"
              />
              K
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Wyślij!
        </button>
      </Form>
    </Formik>
  );
};
```

Sporo się wydarzyło na raz. Przeanalizujmy zmiany.
prawda jest taka, że prawie wszystko co zostało dodane w poprzednim snippecie to zwykły JSX formularza z kilkoma dodatkowymi klasami z Bootstrapa (po to był nam CDN w pliku index.html). W zasadzie to mamy dwa inputy tekstowe i labelki z nimi zwiazane, radio button z labelką i button submit.

Jedyną wartą uwagi różnicą jest nowy komponent `Field` z paczki Formika.
Ten kompoent potrafi wiele rzeczy ale najważniejsze na ten moment jest to, że automatycznie połączy input ze stanem Formika. Oznacza to, że nie będziemy musieli tworzyć żadnego dodatkowego stanu w naszym komponencie formularza (przynajmniej do jego ubsługi). Formik będzie dla nas trzymał ten stan a `Field` pozwoli nam w łatwy sposób się z tym stanem połaczyć. To nie jest jedyna moc tego kompoenntu. Dostarcza nam tez dodatkowe `api` pozwalające na przekazanie takich eventów jak `onChange` czy `onBlur`.

Wróćmy do naszego formularza. Jeśli wszystko poszło zgodnie z planem to Twoim oczom powinno się ukazać coś w tym stylu:

<img src="../2021-12-06 formik and yup/imgs/form.png" />

Jest pewien problem. Naprawdę bardzo mały. Ten formularz nie działa. Czegokolwiek nie dotkniesz - apka wybuchnie, generujac błąd.

Pierwszym krokiem w celu naprawienia tej sytuacji jest stworzenie stanu początkowego.

```jsx
const initialValues = {
  nameSurname: "",
  email: "",
  gender: "",
};
```

Nastepnie, musimy połączyc go z Formikiem w następujący sposób

```jsx
<Formik initialValues={initialValues}>...</Formik>
```

Oto efekt

<img src="../2021-12-06 formik and yup/imgs/form-after-fix.png" />

Możesz teraz poklikać w pola formularza i w przycisk. Aplikacja nie wybucha - progress! Niestety widzimy jakieś dziwne `[object object]` w polach i nie jesteśmy w stanie nic w nich wpisać. Dzieje się tak ponieważ nasze inputy są na ten moment niekontrolowane i musimy zrobić jeszcze jedną rzecz aby w pełni zintegrować je z Formikiem. Musimy dać naszym Fieldom odpowiadnie `value`. Dla każdego bardziej doświadczonego z React-em, ten mechanizm nie będzie żadną niespodzianką.

Chcemy uzyskać taki efekt:

```jsx
<Field
  type="text"
  id="nameSurname"
  value={stanNaszegoFormika.wartoscDanegoPola} // <--- to nas interesuje. Zaraz podamy tu odpowiednie wartości
  className="form-control"
/>
```

Pozostaje jednak pewna niewiadoma. W jaki sposób dostać się do danych z formularza, które trzyma dla nas Formik?

Formik w wielu przypadkach opiera się na mechanizmach `render props`. Zrozumienie i wykorzystanie tego faktu będzie kluczowe w dalszych krokach. Najlepiej zobrazować istotne rzeczy na przykładzie. Tak wygląda teraz plik z naszym formularzem:

```jsx
import { Formik, Form, Field } from "formik";
import "../src/form.css";

const initialValues = {
  nameSurname: "",
  email: "",
  gender: "",
};

export const FormikForm = () => {
  return (
    <Formik initialValues={initialValues}>
      {(props) => {
        // Ważna zmiana w powyższej linijce!
        return (
          <Form>
            {/* Zwracamy niezmieniony komponent! */}
            <div>
              <label htmlFor="nameSurname">Imię i Nazwisko</label>
              <Field type="text" id="nameSurname" className="form-control" />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <Field type="text" id="email" className="form-control" />
            </div>
            <div>
              <label htmlFor="gender" className="form-check-label">
                Płeć
              </label>
              <div className="radio-wrapper form-check">
                <div>
                  <Field
                    type="radio"
                    name="gender"
                    value="M"
                    className="form-check-input"
                  />
                  M
                </div>
                <div>
                  <Field
                    type="radio"
                    name="gender"
                    value="K"
                    className="form-check-input"
                  />
                  K
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Wyślij!
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
```

Najważniejsza zmiana jest taka, że wewnątrz naszego komponentu `<Formik>` otworzyliśmy nawiasy klamrowe, w których użyliśmy syntaxu funkcji strzałkowej. Funkcja ta zwraca cały nasz komponent `<Form>`. On sam nie uległ zmianie. Plusem jest to, że dzięki tej operacji jesteśmy w stanie dobrać się do API i do wartości pzechowywanych w Formiku.

Jeśli chcesz się o tym przekonać osobiście to pod linijką...

```jsx
{(props) => {...}

```

...wyloguj sobie wartości parametru `props` korzystając z `console.log(props)`

```jsx
console.log(props);
```

Twoim oczom ukaże się nastepujący widok. Jest to kluczowy "aha" moment w pierwszym podejściu do Formika.

<img src="../2021-12-06 formik and yup/imgs/consoleOutput.png" />

Jak widzisz - ten początkowo dziwny i trochę nieintuicyjny zabieg otworzył przed nami wiele możliwości.
Zwróć szczególną uwagę na sam koniec tego obiektu. To wlaśnie tam Formik przechowuje stan naszego formularza.
Patrząc na `[object object]` - ma to sens bo dokładnie to samo widzieliśmy w naszym formularzu.

Kolejnym krokiem będzie przekazanie do pól formularza `<Field>` wartości z obiektu `values`. W ten sposób będziemy mieli pełną kontrolę nad wartościami w naszych inputach i będziemy mogli robić z nimi co nam się tylko podoba.
Kod po zmiananach bedzie wygladal w ten sposob:

```jsx
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../src/form.css";

const initialValues = {
  nameSurname: "",
  email: "",
  gender: "",
};

export const FormikForm = () => {
  return (
    <Formik initialValues={initialValues}>
      {(props) => {
        return (
          <Form>
            <div>
              <label htmlFor="nameSurname">Imię i Nazwisko</label>
              <Field
                type="text"
                id="nameSurname"
                className="form-control"
                value={props.values.nameSurname} // ISTOTNA ZMIANA
              />
            </div>
            <div>
              <label htmlFor="email">E-mail</label>
              <Field
                type="text"
                id="email"
                className="form-control"
                value={props.values.email} // ISTOTNA ZMIANA
              />
            </div>
            <div>
              <label htmlFor="gender" className="form-check-label">
                Płeć
              </label>
              <div className="radio-wrapper form-check">
                <div>
                  <Field
                    type="radio"
                    name="gender"
                    value="M"
                    className="form-check-input"
                  />
                  M
                </div>
                <div>
                  <Field
                    type="radio"
                    name="gender"
                    value="K"
                    className="form-check-input"
                  />
                  K
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Wyślij!
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
```

Powyższa zmiana spowodowała, że odzyskalismy pełną kontrolę nad polami typu `text`. Czegokolwiek tam nie wpiszemy - zmiana ta zostanie odzwierciedlona w obiekcie `{props.values}`, a co ważniejsze - w naszym formularzu, w ktorym nareszcie jesteśmy w stanie coś wpisać.

## Waliadcja

W pewnym sensie panujemy już nad naszym formularzem. Niestety w dalszym ciągu użytkownik jest w stanie wpisać cokolwiek, gdziekolwiek i ujdzie mu to na sucho. Oczywiście taka sytuacja nie może mieć miejsca w prawdziwych, komercyjnych projektach bo byle czego wysyłać do naszego backendu nie zamierzamy (Hipotetycznie. W tym wpisie nie planuję poruszać kwestii `backendowych`). W jaki sposób można te dane zwalidować?

Wykorzystamy w tym celu drugą bibliotekę, którą instalowaliśmy na samym początku tego wpisu. Bibliotekę `Yup`.

Dzięki niej będziemy w stanie w bardzo prosty sposób tworzyć obiekty, tkzw. `schema-y`, w których przechowywać będziemy reguły walidacyjne dla każdego z pól. Oczywiście każdego, który takiej walidacji wymaga. Im szybciej przejdziemy do kodu tym szybciej zrozumiemy o co chodzi więc przejdźmy do rzeczy.

Krok pierwszy to podstawowa struktura `schemy` i import Yup-a. Żeby nie komplikować zaimportujmy wszystko w tym samym pliku, w którym stworzyliśmy formularz.

```jsx
import * as Yup from "yup";

const userValidationSchema = Yup.object().shape({});
```

Pomyślmy teraz jak może wyglądac podstawowa walidacja dla pola `nameSurname`. Oczywiście wewnątrz powyższej schemy.

```jsx
const userValidationSchema = Yup.object().shape({
  nameSurname: Yup.string().required("Pole wymagane"),
});
```

Co oznacza ta dodatkowa linijka? Sprawia ona ,że pole `nameSurname` staje się polem wymaganym i w przypadku braku jakiejkolwiek wartości chcemy wygenerować dla tego pola błąd o treści "Pole wymagane". Jeśli wydaje Ci się to podejrzane i nie widzisz jeszcze połączenia schemy z formularzem to bardzo się cieszę, że czytasz ten wpis z uwagą. Oczywiście masz rację. Zrobimy to w nastepnym kroku.

Integracja Yup-a i Formika jest naprawdę banalna. Narzędzia te bardzo dobrze ze sobą współgrają. Aby podpiąc naszą schemę do Formika musimy do komponentu Formik przekazać `props` o nazwie `validationSchema` i przekazać ją (schemę) jako wartość.

```jsx
<Formik
    initialValues={initialValues}
    validationSchema={userValidationSchema}
>
```

Czy walidacja jest gotowa? Czy zobaczymy bląd jeśli pole podczas wysłania formularza okaże się puste? Nie, jeszcze nie. To co jesteśmy w stanie zobaczyć na ten moment to wypełniony obiekt `errors` w konsoli deweloperskiej gdy wologujemy wartość

```jsx
{(props) => {...
console.log(props)
```

Dokladnie tak, jak robilismy to wcześniej. W calym obiekcie `props` poszukajmy obiektu `errors`. Będzie on wyglądal mniej więcej w ten sposób

```javascript
errors: {
  nameSurname: "Pole wymagane";
}
```

To pierwszy i bardzo ważny krok w kierunku działającej walidacji ponieważ dzięki temu obiektowi mamy teraz miejsce, w którym przechowywane będą błędy. Bardzo wygodne jest to, że Formik przechowuje je dla nas "automagicznie". Zwróć też uwagę, że komunikat błędu "Pole wymagane" jest dokładnie tym stringiem, którego widzieliśmy w naszej schemie.

Kolejny krok to wyświetlenie błędu w formularzu. Formik dostarcza nam komponent, który nada się do tego zadania idealnie. Nazywa sie `<ErrorMessage />` i potrafi wyświetlić dowolny znacznik `html` z komunikatem błędu w środku.

Dodajmy go bezpośrednio pod znacznikiem Field definiującym pole `nameSurname`.

```jsx
<Field
    type="text"
    id="nameSurname"
    className="form-control"
    value={props.values.nameSurname}
/>
    <ErrorMessage name="nameSurname">
    {(msg) => <div className="text-danger">{msg}</div>}
    </ErrorMessage>
```

Podajemy mu jako prop wartość `name`. Wewnątrz renderujemy `div-a`, który w środku przechowuje właściwą treść blędu. Komponent `ErrorMessage` potrafi automatycznie wyszukać dla nas odpowiedni błąd. Ważne jest aby string podany jako wartość propa `name` zgadzał się z nazwą widoczną w obiekcie `errors`.

Jeśli teraz włączysz aplikację i klikniesz w przycisk "Wyślij" to Twoim oczom powinna się ukazac taka oto działająca walidacja
