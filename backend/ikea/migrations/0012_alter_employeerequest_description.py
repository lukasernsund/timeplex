# Generated by Django 4.0.4 on 2022-05-17 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ikea', '0011_merge_20220516_1401'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeerequest',
            name='description',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
