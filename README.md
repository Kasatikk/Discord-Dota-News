# <img src="https://i.imgur.com/J4h8NOO.png" width="30" height="30"> Dota 2 News Bot

<p align="center">
  <img src="https://i.postimg.cc/QCzrwdmn/Group-10.png" width="311" alt="DLogo">
</p>

<h3 align="center">✨ Публичный Discord-бот, предназначенный для настраиваемого постинга новостей по Dota 2 ✨</h3>

## 🔥 Основные функции

```diff
# Новостной модуль
+ Автоматический сбор новостей с 10+ источников
+ Гибкие настройки формата (текст/эмбед/мини)
+ Фильтры по темам: патчи, турниры, моды
+ Поддержка мультиязычности

# Стрим-модуль
+ PIP-плеер для Twitch/YouTube
+ Уведомления о live-трансляциях
+ Система рекомендаций стримов
```

## ⚡️ Быстрый старт

```bash
# Установка
bun install

# Конфигурация
cp config.example.json config.json

# Запуск
bun start
```

```json
// config.json
{
  "news": {
    "style": "rich_embed",
    "interval": 30,
    "language": "ru"
  },
  "streams": {
    "quality": "720p",
    "pip": true
  }
}
```

## 🎮 Команды

| Команда       | Описание                  | Пример               |
|--------------|--------------------------|----------------------|
| `!news`      | Последние новости        | `!news 3`           |
| `!watch`     | Запустить стрим          | `!watch url`        |
| `!setup`     | Настройка канала         | `!setup #general`   |
