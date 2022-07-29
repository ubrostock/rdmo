# Generated by Django 3.2.14 on 2022-07-29 09:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0051_alter_value_value_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invite',
            name='email',
            field=models.EmailField(blank=True, help_text='The e-mail for this membership.', max_length=254, verbose_name='E-mail'),
        ),
        migrations.AlterField(
            model_name='value',
            name='value_type',
            field=models.CharField(choices=[('text', 'Text'), ('url', 'URL'), ('integer', 'Integer'), ('float', 'Float'), ('boolean', 'Boolean'), ('datetime', 'Datetime'), ('email', 'E-mail'), ('phone', 'Phone'), ('option', 'Option'), ('file', 'File')], default='text', help_text='Type of this value.', max_length=8, verbose_name='Value type'),
        ),
    ]
