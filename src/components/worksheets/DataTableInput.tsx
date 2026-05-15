import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Row = {
  initial: string;
  final: string;
};

interface DataTableInputProps {
  rows?: number;
  concordanceThreshold?: number;
  onChange?: (data: any) => void;
}

export default function DataTableInput({
  rows = 4,
  concordanceThreshold = 0.10,
  onChange,
}: DataTableInputProps) {
  const [data, setData] = useState<Row[]>(
    Array.from({ length: rows }, () => ({ initial: "", final: "" }))
  );

  const updateRow = (index: number, field: keyof Row, value: string) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
    onChange?.(updated);
  };

  const titres = useMemo(() => {
    return data.map((row) => {
      const i = parseFloat(row.initial);
      const f = parseFloat(row.final);

      if (isNaN(i) || isNaN(f)) return null;
      return +(f - i).toFixed(2);
    });
  }, [data]);

  const concordantIndex = useMemo(() => {
    const valid = titres.filter((t): t is number => t !== null);
    if (valid.length < 2) return [];

    const mean = valid.reduce((a, b) => a + b, 0) / valid.length;

    return titres.map((t) =>
      t !== null && Math.abs(t - mean) <= concordanceThreshold
    );
  }, [titres, concordanceThreshold]);

  return (
    <Card className="rounded-2xl p-4">
      <h3 className="mb-4 text-lg font-semibold">Titration Data Table</h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trial</TableHead>
            <TableHead>Initial (cm³)</TableHead>
            <TableHead>Final (cm³)</TableHead>
            <TableHead>Titre (cm³)</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>

              <TableCell>
                <Input
                  type="number"
                  value={row.initial}
                  onChange={(e) => updateRow(i, "initial", e.target.value)}
                />
              </TableCell>

              <TableCell>
                <Input
                  type="number"
                  value={row.final}
                  onChange={(e) => updateRow(i, "final", e.target.value)}
                />
              </TableCell>

              <TableCell>
                <div
                  className={
                    concordantIndex[i]
                      ? "font-bold text-green-600"
                      : "text-slate-600"
                  }
                >
                  {titres[i] ?? "-"}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
