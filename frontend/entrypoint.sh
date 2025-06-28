#!/bin/sh

# Создаем config.json на основе переменной окружения
cat <<EOF > /usr/share/nginx/html/config.json
{
  "REACT_APP_API_URL": "${REACT_APP_API_URL}"
}
EOF

# Запускаем nginx
nginx -g 'daemon off;'
