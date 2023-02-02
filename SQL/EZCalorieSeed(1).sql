USE [EZCalorie]
GO

SET IDENTITY_INSERT [UserRole] ON
INSERT INTO [UserRole] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'Regular');
SET IDENTITY_INSERT [UserRole] OFF


SET IDENTITY_INSERT [Meal] ON
INSERT INTO [Meal] ([Id], [Name], [Calories], [FatTotal], [Protein], [Carbs], [Date], [MealTypeId], [UserId]) 
VALUES (1, '1lb brisket', 1312.3, 82.9, 132, 0, SYSDATETIME(), 2, 1);
SET IDENTITY_INSERT [Meal] OFF


SET IDENTITY_INSERT [MealType] ON
INSERT INTO [MealType] ([Id], [Name])
VALUES (1, 'Breakfast'), (2, 'Lunch'), (3, 'Dinner'), (4, 'Snack');
SET IDENTITY_INSERT [MealType] OFF

SET IDENTITY_INSERT [User] ON
INSERT INTO [User] (
	[Id], [UserRoleId], [DisplayName], [Email], [FirebaseUserId], [CurrentWeight], [GoalWeight], [DailyCaloriesRequired])
VALUES (1, '1', 'Seabie', 'surfermercer@gmail.com', 'zngS08RvLMerPFr1GwdwsfpE2222', 175, NULL, NULL);
SET IDENTITY_INSERT [User] OFF

