# Вычислитель отличий


[![Actions Status](https://github.com/1pancho/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/1pancho/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/b026ed49de397af0e60d/maintainability)](https://codeclimate.com/github/1pancho/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b026ed49de397af0e60d/test_coverage)](https://codeclimate.com/github/1pancho/frontend-project-46/test_coverage)

Программа сравнивает два конфигурационных файла JSON, либо YAML в трех различных форматаха форматах и показывает разницу между ними.

### Минимальные требования
Для устновки игры понадобится:
- Лучший вариант: установить Linux второй операционной системой (https://losst.ru/ustanovka-linux-ryadom-s-windows-10)
- Нормальный вариант: запускать Linux на виртуальной машине (https://guides.hexlet.io/ru/ubuntu-linux-in-windows/)
- Сложный вариант: работать в Windows без установки Linux. (https://guides.hexlet.io/ru/development-on-windows/)

Если у Вас MacOS:
- Установите homebrew как основной менеджер пакетов
- Установите iterm2

### Дальнейшая установка для Linux/WSL 2/MacOS:
Установить глобально Node.js версии не ниже 16.8.0 Скопировать локально данный репозиторий в удобное место на вашем компьютере Выполнить установку зависимостей при помощи команды make install в терминале Выполнить установку игр при помощи команды npm link в терминале.

## Полезные команды

```
gendiff [options] <filepath1> <filepath2>

Options:
  -h, --help           display help for command
  -V, --version        output the version number
  -f, --format <type>  output format [stylish, plain, json] (default: "stylish")
```

## Демонстрация запуска работы утилиты:

#### Сравнение без выбора формата (по умолчанию stylish)

https://asciinema.org/a/BqS2LC6rDb8rnrB6BF8eUwOjT


#### Сравнение с форматом plain

https://asciinema.org/a/Sp3PiRz4e0NawBiDzpIvTyYTR


#### Сравнение с форматом json

https://asciinema.org/a/FsxB5iMRUQbmOGHMDSlknLMAP
