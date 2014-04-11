*NOT READY FOR USE - STILL IN DEVELOPMENT*
orm-mssql
=========

The goal of this module is to provide an ORM interface for mssql. Other popular modules like [sequelize](https://github.com/sequelize/sequelize) have support for a variety of database systems but haven't completed implementations to handle mssql. The module will be implemented in stages of functionality and is inspired by [sequelize](https://github.com/sequelize/sequelize) and [mongoose](https://github.com/learnboost/mongoose).

## Planned features for 1.0
* Single table representation with self-validating models.
* Relationships between tables characterized by relationships between models.
* Table schema manangement mirroring model.
* Index manipulation based on model rules including foreign keys defined by model relationships.
* Constraints, triggers, etc defined by rules in models. 
 
## Future roadmap
* Access to query layer to provide developer with ability to run custom queries.
* Allow functions to be defined on models to provide custom business logic before and after query execution (ala mongoose virtuals).
* Allow function to be defined on models that will be represented as stored procedures in database.

## Technologies
* [tedious](https://github.com/pekim/tedious)
* [tedious-connection-pool](https://github.com/pekim/tedious-connection-pool)
