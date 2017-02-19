# Bibloteka API dla JavaScript

Gotową do użycia bibliotekę JavaScript możesz pobrać stąd:
* wersja pełna - https://www.krater.pl/download/krater.API.js
* wersja spakowana - https://www.krater.pl/download/krater.API.min.js

## Pojęcia

Wielkość liter w identikatorach ma znaczenie.

* sub - identyfikator kategorii
* post - indetyfikator wpisu
* user - identyfikator użytkownika (nazwa użytkownika)
* callback - funkcja wywołania zwrotnego

## Parametry funkcji wywołania zwrotnego

Do funkcji callback zawsze przekazywane są dwa argumenty:

* obiekt response, zawierący różne właściwości, ale tylko następujące są gwarantowane:
    * status - kod HTTP odpowiedzi
* obiekt data, zawierający odpowiedź serwera

## Inicjalizacja

Przed użycie należy zainicjować biblotekę API za pomocą nazwy użytkownika i tokenu uzyskanego za pomocą OAuth 2.0

    krater.API.init(user, token);

## Pobieranie listy postów

Możemy pobierać na raz wpisy z wielu kategorii. W odpowiedzi dostaniemy też informacje o danej kategorii.

#### Dostępne funkcje:

    // gorące
    krater.API.getHotPosts(callback, ['krater']);

    // nowe
    krater.API.getNewPosts(callback, ['krater']);

    // top
    krater.API.getTopPosts(callback, ['krater'], period);

Dopuszalne wartości argumentu period:

* hour
* day
* week
* month
* all

#### Przykład zwracanej struktury danych:

    {
        "posts": [
            {
                "comments": 28,
                "hotscore": 583780278,
                "img": null,
                "link": "",
                "nsfw": false,
                "post": "1485891HLyT",
                "sub": "kategorie",
                "text": "Póki co (dajcie nam ze trzy dni ;-)), chwalcie się nowymi kategoriami tutaj.",
                "timestamp": 1485891057894,
                "title": "Lista wszystkich krategorii",
                "topscore": 6,
                "user": "chondryt"
            }
        ],
        "subs": [
            {
                "administrators": [
                    "krater"
                ],
                "creator": "krater",
                "description": "Kategoria poświęcona dyskusjom o innych kategoriach w serwisie krater.",
                "id": "kategorie",
                "moderators": [
                    "chondryt",
                    "tuwim",
                    "verde"
                ],
                "nsfw": false,
                "subscribersCount": 3
            }
        ]
    }

## Pobieranie listy komentarzy

Komentarze pobieramy zawsze dla wybranego jednego wpisu, musimy też podać identyfikator kategorii. W oodpowiedzi dostaniemy informacje o wpisie, kategorii oraz listę komentarzy.

#### Dostępne funkcje:

    // gorące
    krater.API.getHotComments(callback, sub, post);

    // nowe
    krater.API.getNewComments(callback, sub, post);

    // top
    krater.API.getTopComments(callback, sub, post);

#### Przykład zwracanej struktury danych:

    {
        "comments": [
            {
                "downs": 0,
                "id": "1486689b8NE",
                "ip": "",
                "mod_reason": null,
                "parent": "*",
                "post": "14866889kkp",
                "post_nsfw": false,
                "post_title": "Uruchomienie API już tuż za rogiem",
                "post_user": "verde",
                "sub": "krater",
                "text": "Działające API mamy od początku, bo tak został zbudowany krater, że sam korzysta ze swojego API serwerowego.\r\n\r\nTeraz mamy już gotowe OAuth 2.0, dla mniej techicznych: powyższe okienko. \r\n\r\nBędziemy obsługiwać standardowy schemat działania \"3-Legged OAuth 2.0\", czyli \"authorization code\" oraz uproszczony, czyli \"implicit grant\". Wszystko zgodnie z RFC6749, także ograniczenia takie jak np. brak refresh tokenów w \"implicit grant\" i przekazywanie go przez \"fragment\" a nie \"query string\", etc). Co generalnie oznacza, że będzie wpełni zgodnie z gotowymi bibliotekami do OAuth 2.0, które są dostępne dla każdego języka programowania.\r\n\r\nUdostępnimy też gotowe biblioteki do samego API (powyżej mówimy o autoryzacji).\r\n\r\nZostało nam jeszcze troche testów i pracy związanej głównie z obsługą błędów i dodaniem interfejsu do rejestracji aplikacji.",
                "timestamp": 1486688932692,
                "topscore": 2,
                "ups": 2,
                "user": "verde",
                "hotscore": 0.54909235
            },
            {
                "downs": 0,
                "id": "148711526ob1",
                "ip": "",
                "mod_reason": null,
                "parent": "1486689b8NE",
                "post": "14866889kkp",
                "sub": "krater",
                "text": "Na tę chwilę siedzę nad dokumentacją do biblioteki API dla JavaScript, w tym tygodniu na pewno je otworzymy.",
                "timestamp": 1487114767112,
                "topscore": 0,
                "ups": 0,
                "user": "verde",
                "hotscore": 0
            }
        ],
        "post": {
            "comments": 2,
            "hotscore": 759199997,
            "img": null,
            "ip": "",
            "link": "http://i.imgur.com/DAcyOcE.png",
            "nsfw": false,
            "post": "14866889kkp",
            "sub": "krater",
            "text": "",
            "timestamp": 1486688370739,
            "title": "Uruchomienie API już tuż za rogiem",
            "topscore": 4,
            "user": "verde"
        },
        "sub": {
            "administrators": [
                "krater"
            ],
            "creator": "krater",
            "description": "Kategoria poświęcona dyskusjom i nowinkom na temat krateru.",
            "id": "krater",
            "moderators": [
                "chondryt",
                "tuwim",
                "verde"
            ],
            "nsfw": false,
            "subscribersCount": 24
        },
        "rootComments": [
            {
                "downs": 0,
                "id": "1486689b8NE",
                "ip": "",
                "mod_reason": null,
                "parent": "*",
                "post": "14866889kkp",
                "sub": "krater",
                "text": "Działające API mamy od początku, bo tak został zbudowany krater, że sam korzysta ze swojego API serwerowego.\r\n\r\nTeraz mamy już gotowe OAuth 2.0, dla mniej techicznych: powyższe okienko. \r\n\r\nBędziemy obsługiwać standardowy schemat działania \"3-Legged OAuth 2.0\", czyli \"authorization code\" oraz uproszczony, czyli \"implicit grant\". Wszystko zgodnie z RFC6749, także ograniczenia takie jak np. brak refresh tokenów w \"implicit grant\" i przekazywanie go przez \"fragment\" a nie \"query string\", etc). Co generalnie oznacza, że będzie wpełni zgodnie z gotowymi bibliotekami do OAuth 2.0, które są dostępne dla każdego języka programowania.\r\n\r\nUdostępnimy też gotowe biblioteki do samego API (powyżej mówimy o autoryzacji).\r\n\r\nZostało nam jeszcze troche testów i pracy związanej głównie z obsługą błędów i dodaniem interfejsu do rejestracji aplikacji.",
                "timestamp": 1486688932692,
                "topscore": 2,
                "ups": 2,
                "user": "verde",
                "hotscore": 0.54909235
            }
        ],
        "subComments": {
            "1486689b8NE": [
                {
                    "downs": 0,
                    "id": "148711526ob1",
                    "mod_reason": null,
                    "parent": "1486689b8NE",
                    "post": "14866889kkp",
                    "sub": "krater",
                    "text": "Na tę chwilę siedzę nad dokumentacją do biblioteki API dla JavaScript, w tym tygodniu na pewno je otworzymy.",
                    "timestamp": 1487114767112,
                    "topscore": 0,
                    "ups": 0,
                    "user": "verde",
                    "hotscore": 0
                }
            ]
        }
}

#### Wyświetlanie drzewa komentarzy:

Powyższa struktura danych zawiera trzy właściwości z listą komentarzy:

* comments - po prostu lista wszystkich komentarzy
* rootComments - lista komentarzy najwyższego poziomu
* subComments - obiekt którego klucze to indetyfikatory komentarzy nadrzędnych

Przykład sposobu renderowania drzewa komentarzy z wykorzystaniem rekurencji:

    var renderRootComment;
    renderRootComment = function (root) {
        var container = renderComment(root), children = subComments[root.id];
        if (children) {
            for (var i=0, l=children.length; i<l; i++) {
                container.appendChild(renderRootComment(children[i]));
            }
        }
        return container;
    }

#### Komentarze usunięte przez moderatora

Jeżeli ustawiona jest właściwość ```mod_reason``` należy wyswietlić ją zamiast ```text``` z adnotacją, że komentarz został usunięty przez moderatora. Wartość ```text``` **MOŻE** zawierać oryginalną treść komentarza.

## Pobieranie listy zgłoszeń i usuniętych treści

    krater.API.getRemoved(callback, ['krater']);

    krater.API.getReports(callback, ['krater']);

Struktura odpowiedzi jest podobna jak w przypadku pobierania listy wpisów i komentarzy.

Dostępne są właściwości:

* posts - zawierający listę postów
* comments - zawierający listę komentarzy
* entries - zawierający sumę powyższych

Sortowanie jest zawsze od najnowszych do najstarszych.

Część właściwości wpisów/komentarzy nie jest dostępna w tym widoku (np. hotscore).

W przypadku usuniętych oryginalna treść **MOŻE** nie być dostępna jeżeli moderator tak zadecyduje.

## Pobieranie informacji o użytkowniku

    krater.API.getUser(callback, user);

## Pobieranie listy najnowszych wpisów

    krater.API.getAllPosts(callback, nsfw);

```nsfw``` możę przyjmować wartość ```true``` lub ```false```.

Zwracana struktura jest listą wpisów posortowaną od najnowszego.

## Pobieranie listy najnowszych komentarzy

    krater.API.getAllComments(callback, nsfw);

```nsfw``` możę przyjmować wartość ```true``` lub ```false```.

Zwracana struktura jest listą komentarzy posortowaną od najnowszego.

## Pobieranie listy kategorii

    krater.API.getSubs(callback);

## Pobieranie zawartości skrzynki użytkownika

    krater.API.getInbox(callback);

## Głosowanie na dany wpis lub komentarzy

    krater.API.vote(callback, sub, post, comment, direction);

W przypadku głosowania na wpis w argumencie ```comment``` należy podać wartość ```"*"```.

## Dodawanie wpisu

    krater.API.post(callback, sub, data);

Właściwości ```data```:

* title - tytuł
* text - opcjonalnie
* link - opcjonalnie, musi być poprawnym linkiem.
* nsfw - ```true``` lub ```false```

Na raz można przesłać text lub link. Nigdy oba na raz.

W odpowiedzi zwracana jest struktura taka jak dla wywołania:

    krater.API.getHotComments(callback, sub, post);

co umożliwia łatwe wyświetlenie widoku wpisu.

## Dodawanie komentarza

    krater.API.comment(callback, sub, post, comment, text);

W przypadku dodawania komentarza nie będącego odpowiedzią na inny komentarz w argumencie ```comment``` należy podać wartość ```"*"```.

## Zapisywanie się do kategorii

    krater.API.subscribe(callback, sub);

## Wypisywanie się z kategorii

    krater.API.unsubscribe(callback, sub);

## Tworzenie kategorii

TODO

## Zgłaszanie wpisu lub komentarza

TODO

## Zatwierdzanie zgłoszenia (moderacja)

TODO

## Odrzucanie zgłoszenia (moderacja)

TODO
