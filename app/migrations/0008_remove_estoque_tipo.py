# Generated by Django 3.1.2 on 2020-10-17 15:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_auto_20201017_0345'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='estoque',
            name='tipo',
        ),
    ]
