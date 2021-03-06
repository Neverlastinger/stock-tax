## Calculating stock taxes for НАП

https://neverlastinger.github.io/stock-tax/

This is a simple web app that provides help in calculating taxes for people who buy and sell stocks according to the Bulgarian law. Since it is only useful for Bulgarian residents, the next description is in Bulgarian.

### Идея

Търговията на акции на американската стокова борса налага деклариране на данни пред НАП и плащане на такси. Този app помага в смятането на печалбата / загубата, която се декларира в Приложение 5 (продажба на акции). Може да помогне и за декларирането на текущо притежаваните акции в Приложение 8. Автоматично превалутира цената на покупка и продажба от USD в лева на датата на транзакцията спрямо курса на [Европейската централна банка](https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html). Този курс може да се различава от официалния курс на БНБ след 5-тия символ след десетичната запетая. При продажба на акция, покупната цена се изчислява на база средната покупна цена в лева от предишни покупки. Тези сметки са елементарни, но времеемки за правене ръчно, заради което беше създаден този app. Ползвайте на своя отговорност. За грешни изчисления или данни авторът на този app не носи отговорност.

### Ползване

1. Въвежда се името на акцията в полето Stock name и се натиска Enter.
2. Появява се възможност за добавяне на транзакции за тази акция - въвежда се:
  - buy / sell - покупка или продажба.
  - Брой акции - броят на закупените или продадените акции в тази транзакция.
  - [USD] Цена на придобиване / продажба - това е цялата цена за всички акции за тази транзакция; напр. при покупка на 3 акции, всяка от която е струвала $100, в полето се попълва 300. Тази информация присъства в репорта на брокерите.
  - MM/DD/YYYY дата - дата във формат месец/ден/година, напр. 02/28/2021. Това е американският формат на датата, който присъства в репорта на американските брокери.
3. Натиска се бутона Add, за да се добави тази транзакция.
4. Добавят се всички транзакции до края на годината, за която се подават данни към НАП.
5. Ако са регистрирани sell транзакции, тогава се появава секция "За деклариране в Приложение 5 на НАП (продажба на акции)". В тази секция има всичко необходимо за попълване на данни в Приложение 5.
6. Стъпки 1-5 се правят за всички акции, които са търгувани през съответната година.

Въведените данни се съхраняват единствено в браузъра (`localStorage`) с цел да не се загубят при refresh на страницата. Този app не използва cookies и не съхранява никаква информация въведена от потребителите.
