# -*- coding: utf-8 -*-
# Generated by Django 1.11.14 on 2018-08-21 13:11
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('conditions', '0015_move_attribute_to_attributeentity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='condition',
            name='relation',
            field=models.CharField(choices=[('eq', 'is equal to (==)'), ('neq', 'is not equal to (!=)'), ('contains', 'contains'), ('gt', 'is greater than (>)'), ('gte', 'is greater than or equal (>=)'), ('lt', 'is lesser than (<)'), ('lte', 'is lesser than or equal (<=)'), ('empty', 'is empty'), ('notempty', 'is not empty')], help_text='The relation this condition is using.', max_length=8, verbose_name='Relation'),
        ),
        migrations.AlterField(
            model_name='condition',
            name='source',
            field=models.ForeignKey(blank=True, db_constraint=False, help_text='The attribute of the value for this condition.', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='domain.Attribute', verbose_name='Source'),
        ),
        migrations.AlterField(
            model_name='condition',
            name='uri',
            field=models.URLField(blank=True, help_text='The Uniform Resource Identifier of this condition (auto-generated).', max_length=640, null=True, verbose_name='URI'),
        ),
    ]
