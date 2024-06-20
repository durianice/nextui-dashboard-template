import { create, queryAll } from "@/server/db/members";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageIndex = Number(searchParams.get("pageIndex")) ?? 1;
  const pageSize = Number(searchParams.get("pageSize")) ?? 10;
  const { rows, total } = await queryAll(pageIndex, pageSize);
  return Response.json({ list: rows, total });
}

export async function POST(request: Request) {
  const { data } = await request.json();
  for (let i = 5; i < 50; i++) {
    await create({
      username: `Member${i}`,
      userid: "id_" + i,
      nickName: `Member${i}`,
    });
  }
  return Response.json({ ok: true });
}
