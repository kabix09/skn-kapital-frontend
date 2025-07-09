# SKN "Kapitał" – CMS Zarządzania Kołem Naukowym

System zarządzania działalnością Koła Naukowego Finansów Przedsiębiorstw **"Kapitał"**. Aplikacja typu **CMS** (Content Management System) służy do organizowania wydarzeń, komunikacji wewnętrznej oraz bieżącego zarządzania aktywnością członków.

## ✨ Główne funkcje

- 📅 **Zarządzanie wydarzeniami** – tworzenie, edytowanie i przegląd wydarzeń.
- 👥 **Panel członków** – ewidencja członków i przypisywanie im ról.
- 🗂️ **Modularny interfejs** – szybka nawigacja po różnych częściach systemu.
- 🌗 **Przyjazny interfejs użytkownika** – responsywny i estetyczny design dzięki Tailwind CSS i Material Icons.

## 🛠️ Technologie

Projekt został zbudowany w oparciu o nowoczesny stack frontendowy:

- ⚡ **Vue 3** – nowoczesny framework JavaScript do budowy interfejsów użytkownika
- 🚀 **Vite** – ultraszybkie środowisko uruchomieniowe i bundler
- 🎨 **Tailwind CSS** – narzędzie do szybkiego stylowania komponentów
- 🔤 **Material Icons** – nowoczesne ikony do lepszej wizualizacji UI

## 📦 Instalacja

Aby uruchomić projekt lokalnie:

```bash
git clone https://github.com/twoja-nazwa-uzytkownika/skn-kapital.git
cd skn-kapital
npm install
npm run dev
```

## ✅ Wymagania

- Node.js 18+
- npm 9+

## 📄 Licencja

Kod źródłowy tego projektu jest udostępniony wyłącznie w celach edukacyjnych i demonstracyjnych.
Nie wolno go kopiować, modyfikować, rozpowszechniać ani wykorzystywać w innych projektach bez pisemnej zgody autora.

Wszelkie prawa zastrzeżone ©kabix09 2025

### primevue
```
npm install primevue primeicons 
```
Bład pryz łądowaniu w `main.js`

[Błęd](https://github.com/primefaces/primevue/issues/6268)

Z [auto import](https://primevue.org/autoimport/) działa już poprawnie 
```
npm install -D unplugin-vue-components @primevue/auto-import-resolver
```

ale style ładują się na czarno wiec trzeba poprawić import

```
    .use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: 'light', // Wymuszenie jasnego trybu
            }
        }
    })
```