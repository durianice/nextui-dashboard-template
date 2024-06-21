import { create, deleteById, queryAll, updateById } from "@/server/db/members";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageIndex = Number(searchParams.get("pageIndex")) ?? 1;
  const pageSize = Number(searchParams.get("pageSize")) ?? 10;
  const { rows, total } = await queryAll(pageIndex, pageSize);
  return Response.json({ list: rows, total });
}

export async function POST(request: Request) {
  const { data } = await request.json();
  if (data.username && !data.nickName) {
    data.nickName = data.username;
  }
  await create(data);
  return Response.json({ ok: true });
}

export async function PUT(request: Request) {
  const { data } = await request.json();

  const insertData = {
    ...data,
  };

  console.log(insertData, "PUT")

  delete insertData.id;
  delete insertData.createdAt;
  delete insertData.updatedAt;

  await updateById(data.id, insertData);

  return Response.json({ ok: true });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  console.log(id, "DELETE");
  if (!id) {
    throw new Error("ID is required for delete");
  }
  await deleteById(id);
  return Response.json({ ok: true });
}
