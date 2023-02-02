USE [master]

IF db_id('EZCalorie') IS NULl
  CREATE DATABASE [EZCalorie]
GO

USE [EZCalorie]
GO


DROP TABLE IF EXISTS [Meal];
DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS [UserRole];
DROP TABLE IF EXISTS [Exercise];
DROP TABLE IF EXISTS [Follow];
DROP TABLE IF EXISTS [MealType];
GO

CREATE TABLE [Meal] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Calories] decimal NOT NULL,
  [FatTotal] decimal NOT NULL,
  [Protein] decimal NOT NULL,
  [Carbs] decimal NOT NULL,
  [Date] datetime NOT NULL,
  [MealTypeId] int NOT NULL,
  [UserId] int
)
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserRoleId] int NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [CurrentWeight] decimal NOT NULL,
  [GoalWeight] decimal,
  [DailyCaloriesRequired] decimal,
  [Email] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [UserRole] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Exercise] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [CaloriesBurned] decimal NOT NULL,
  [Date] datetime NOT NULL,
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Follow] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FollowerId] int NOT NULL,
  [FollowingId] int NOT NULL
)
GO

CREATE TABLE [MealType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [User] ADD FOREIGN KEY ([UserRoleId]) REFERENCES [UserRole] ([Id])
GO

ALTER TABLE [Meal] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Exercise] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Follow] ADD FOREIGN KEY ([FollowingId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Follow] ADD FOREIGN KEY ([FollowerId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Meal] ADD FOREIGN KEY ([MealTypeId]) REFERENCES [MealType] ([Id])
GO
