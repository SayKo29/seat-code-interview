import { ColumnDef } from "@tanstack/react-table";
import { useUsers } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { useTranslation } from "react-i18next";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export function UsersTable() {
  const { t } = useTranslation(["users", "common"]);
  const { users, isLoading, error, deleteMutation } = useUsers();
  const [search, setSearch] = useState("");

  if (isLoading) return <p>{t("app.loading", { ns: "common" })}</p>;
  if (error) return <p>{t("errors.loadingUsers")}</p>;

  const filteredUsers = users?.filter((user: User) =>
    `${user.first_name} ${user.last_name} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "first_name",
      header: t("table.columns.firstName"),
    },
    {
      accessorKey: "last_name",
      header: t("table.columns.lastName"),
    },
    {
      accessorKey: "email",
      header: t("table.columns.email"),
    },
    {
      id: "actions",
      header: t("table.columns.actions"),
      cell: ({ row }: { row: { original: User } }) => (
        <Button
          onClick={() => deleteMutation.mutate(row.original.id)}
          variant="destructive"
          size="sm"
        >
          {t("buttons.delete", { ns: "common" })}
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{t("table.title")}</h1>
      
      <Input
        placeholder={t("table.searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      
      <DataTable columns={columns} data={filteredUsers ?? []} />
    </div>
  );
}

export default UsersTable;