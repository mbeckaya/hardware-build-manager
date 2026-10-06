from csv import writer
from datetime import datetime
from pathlib import Path

class CsvExporter:
    DIR_EXPORT = Path("./exports")

    def __init__(self, base_filename: str):
        timestamp = datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
        self._path = self.DIR_EXPORT / f"{base_filename}_{timestamp}.csv"

    def generate(
        self,
        headers: list,
        rows: list,
    ) -> None:
        self.DIR_EXPORT.mkdir(parents=True, exist_ok=True)

        with open(self._path, "w", newline="", encoding="utf-8") as file:
            csv_writer = writer(file)
            csv_writer.writerow(headers)
            csv_writer.writerows(rows)

    def get_path(self) -> Path:
        return self._path

    def get_filename(self) -> str:
        return self._path.name