import {
  createAlbum,
  getAlbums,
  getAlbum,
  updateAlbum,
  deleteAlbum,
} from "../../server/actions/albums";

jest.mock("../../server/actions/images", () => ({
  deleteImages: jest.fn(),
}));
jest.mock("../../drizzle/db", () => ({
  db: {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValueOnce([
      {
        id: "1",
        title: "Test Album",
        description: "",
        imageUrl: "",
        albumOrder: 1,
        clerkUserId: "user1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
    query: {
      AlbumTable: {
        findMany: jest
          .fn()
          .mockResolvedValue([{ id: "1", title: "Test Album" }]),
        findFirst: jest
          .fn()
          .mockResolvedValue({ id: "1", title: "Test Album" }),
      },
    },
    update: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    where: jest.fn().mockResolvedValue({ rowCount: 1 }),
    delete: jest.fn().mockReturnThis(),
  },
}));
jest.mock("@clerk/nextjs/server", () => ({
  currentUser: jest
    .fn()
    .mockResolvedValue({ id: "test-user-id", imageUrl: "test.png" }),
  auth: jest.fn().mockResolvedValue({ userId: "test-user-id" }),
}));
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("Albums server actions", () => {
  it("should create an album", async () => {
    const data = {
      title: "Test Album",
      description: "test",
      imageUrl: "https://example.com/image.jpg",
      albumOrder: 1,
    };
    await expect(createAlbum(data as typeof data)).resolves.not.toThrow();
  });

  it("should get albums", async () => {
    const result = await getAlbums("user1");
    expect(result).toEqual([{ id: "1", title: "Test Album" }]);
  });

  it("should get an album by id", async () => {
    const result = await getAlbum("1");
    expect(result).toEqual({ id: "1", title: "Test Album" });
  });

  it("should update an album", async () => {
    const data = {
      title: "Updated Album",
      description: "test new",
      imageUrl: "https://example.com/image.jpg",
      albumOrder: 1,
    };
    await expect(updateAlbum("1", data as typeof data)).resolves.not.toThrow();
  });

  it("should delete an album", async () => {
    await expect(deleteAlbum("1")).resolves.not.toThrow();
  });
});
