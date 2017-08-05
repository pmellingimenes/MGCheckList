# MGCheckList Back-end
Usar o Python 3 para este projeto.

## Resolvendo dependências
Resolva as seguintes dependência utilizando o pip

    python3 -m pip install django
    python3 -m pip install djangorestframework
    python3 -m pip install markdown
    python3 -m pip install django-filter
    python3 -m pip install django-cors-headers

## Configurando o SQLite
Para configurar o SQLite:
    
    **<N_MIGRATION> = Por exemplo, 0001 de 0001_initial.py
    python3 manage.py makemigrations server
    python3 manage.py sqlmigrate server <N_MIGRATION>
    python3 manage.py migrate

## Rodando o servidor de desenvolvimento
Para rodar o servidor de desenvolvimento execute o seguinte comando:

    python3 manage.py runserver