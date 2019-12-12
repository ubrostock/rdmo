import pytest
from django.urls import reverse

users = (
    ('editor', 'editor'),
    ('reviewer', 'reviewer'),
    ('user', 'user'),
    ('api', 'api'),
    ('anonymous', None),
)

status_map = {
    'conditions': {
        'editor': 200, 'reviewer': 200, 'api': 200, 'user': 403, 'anonymous': 302
    },
    'conditions_export': {
        'editor': 200, 'reviewer': 200, 'api': 200, 'user': 403, 'anonymous': 302
    },
    'conditions_import': {
        'editor': 302, 'reviewer': 403, 'api': 302, 'user': 403, 'anonymous': 302
    },
    'conditions_import_error': {
        'editor': 400, 'reviewer': 403, 'api': 400, 'user': 403, 'anonymous': 302
    }
}

export_formats = ('xml', 'html', 'rtf')


@pytest.mark.parametrize('username,password', users)
def test_conditions(db, client, username, password):
    client.login(username=username, password=password)

    url = reverse('conditions')
    response = client.get(url)
    assert response.status_code == status_map['conditions'][username]


@pytest.mark.parametrize('username,password', users)
@pytest.mark.parametrize('export_format', export_formats)
def test_conditions_export(db, client, username, password, export_format):
    client.login(username=username, password=password)

    url = reverse('conditions_export', args=[export_format])
    response = client.get(url)
    assert response.status_code == status_map['conditions_export'][username]


@pytest.mark.parametrize('username,password', users)
def test_conditions_import_get(db, client, username, password):
    client.login(username=username, password=password)

    url = reverse('conditions_import', args=['xml'])
    response = client.get(url)
    assert response.status_code == status_map['conditions_import'][username]


@pytest.mark.parametrize('username,password', users)
def test_conditions_import_post(db, client, username, password):
    client.login(username=username, password=password)

    url = reverse('conditions_import', args=['xml'])
    with open('testing/xml/conditions.xml', encoding='utf8') as f:
        response = client.post(url, {'uploaded_file': f})
    assert response.status_code == status_map['conditions_import'][username]


@pytest.mark.parametrize('username,password', users)
def test_conditions_import_empty_post(db, client, username, password):
    client.login(username=username, password=password)

    url = reverse('conditions_import', args=['xml'])
    response = client.post(url)
    assert response.status_code == status_map['conditions_import'][username]


@pytest.mark.parametrize('username,password', users)
def test_conditions_import_error_post(db, client, username, password):
    client.login(username=username, password=password)

    url = reverse('conditions_import', args=['xml'])
    with open('testing/xml/error.xml', encoding='utf8') as f:
        response = client.post(url, {'uploaded_file': f})
    assert response.status_code == status_map['conditions_import_error'][username]
