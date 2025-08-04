# Инструкции по развертыванию

## Локальная разработка

1. Установите зависимости:
```bash
npm install
```

2. Запустите приложение в режиме разработки:
```bash
npm start
```

3. Откройте [http://localhost:3000](http://localhost:3000) в браузере

## Сборка для продакшена

1. Создайте оптимизированную сборку:
```bash
npm run build
```

2. Собранные файлы будут в папке `build/`

## Развертывание на GitHub Pages

1. Установите gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Добавьте в package.json:
```json
{
  "homepage": "https://yourusername.github.io/news-feed",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. Разверните:
```bash
npm run deploy
```

## Развертывание на Netlify

1. Подключите репозиторий к Netlify
2. Настройте команды сборки:
   - Build command: `npm run build`
   - Publish directory: `build`

## Развертывание на Vercel

1. Установите Vercel CLI:
```bash
npm install -g vercel
```

2. Разверните:
```bash
vercel
```

## Переменные окружения

Создайте файл `.env` для настройки API:

```
REACT_APP_API_BASE_URL=https://dummyjson.com/posts
REACT_APP_POSTS_PER_PAGE=10
```

## Производительность

- Приложение оптимизировано для быстрой загрузки
- Используется lazy loading для изображений
- Код разделен на чанки для лучшей производительности
- Включена минификация для продакшена 