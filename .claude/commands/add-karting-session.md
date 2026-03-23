Add a new karting session to `src/data/karting.json`.

The user will provide a photo of their RaceFacer performance sheet from Pune Kartdrome. Extract data for Srivatsa RV only.

## Data to extract from the sheet

- **session**: Session number (top of sheet, e.g. "Session #102")
- **date**: Date in YYYY-MM-DD format (from header)
- **time**: Time in HH:MM format (from header)
- **track**: Track name (from header, e.g. "Pune Kartdrome")
- **kartType**: Kart type from "Daily Best Times" table (e.g. "SX200", "Pro Karts")
- **kartNumber**: The number after "Kart: #" in Srivatsa RV's column
- **position**: Srivatsa RV's column number (#1, #2, etc. — this IS the finishing position)
- **totalDrivers**: Total number of driver columns on the sheet
- **lapAvg**: The "Lap/Avg" row value for Srivatsa RV (keep original mm:ss.ms format)
- **bestLap**: The **bolded** time in Srivatsa RV's column (keep original format)
- **consistency**: The "Cons." row value for Srivatsa RV (as a number)
- **laps**: Array of all lap times for Srivatsa RV, excluding "Pit" entries (keep original mm:ss.ms format)
- **notes**: Brief note about the session (optional, user can provide or leave empty)

## Format

All times stay in their original `m:ss.sss` format (e.g. "1:04.515"). Do NOT convert to seconds.

## Steps

1. Read the current `src/data/karting.json`
2. Extract data from the provided sheet image
3. Confirm the extracted data with the user before writing
4. Append the new session object to the array
5. Sort the array by date, then by session number
6. Write the updated file
