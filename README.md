# EZ Calorie

A calorie tracking app. Work out your daily energy expenditure, log what you eat and what you burn,
and see where the day actually nets out against your goal.

## What it does

- Calculates **TDEE** (total daily energy expenditure) from the user's inputs, targeted at either a
  weight-gain or weight-loss goal
- Log **meals** with their caloric values — calories in
- Log **exercises** — calories out
- Nets the day's totals against TDEE so progress toward the goal is visible

## Stack

| Layer | What |
|---|---|
| API | ASP.NET Core Web API (.NET 5), C# |
| Data | SQL Server via ADO.NET (`Microsoft.Data.SqlClient`) behind a repository layer — no ORM, hand-written SQL |
| Auth | JWT bearer tokens |
| API docs | Swagger / Swashbuckle |
| Front end | React |
| Schema | `SQL/` holds the create-table and seed scripts |

## Running it

1. Run `SQL/EZCalorieCreateTable.sql` then `SQL/EZCalorieSeed(1).sql` against a SQL Server instance
2. Point the connection string in `appsettings.json` at it
3. `dotnet run` from `EZ Calorie/`
4. `npm install && npm start` from `EZ Calorie/client/ezcalorie`

## Notes

Built as my full-stack capstone at Nashville Software School in early 2023. It's kept public as a record
of that work rather than as something maintained — it targets .NET 5, which is out of support.
