import {
  createImage,
  getImages,
  getUserImageCount,
} from "../../server/actions/images";

jest.mock("../../drizzle/db", () => ({
  db: {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValueOnce([
      {
        id: "1",
        imageUrl: "http://example.com/test.jpg",
        altText: "test",
        imageOrder: 1,
        albumId: "album1",
      },
    ]),
    query: {
      ImageTable: {
        findMany: jest
          .fn()
          .mockResolvedValue([
            { id: "1", imageUrl: "http://example.com/test.jpg" },
          ]),
      },
    },
    select: jest.fn().mockReturnValue({
      from: () => ({
        innerJoin: () => ({
          where: () => [{ count: 1 }],
        }),
      }),
    }),
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

describe("Images server actions", () => {
  it("should create an image", async () => {
    const data = {
      imageUrl: "http://example.com/test.jpg",
      altText: "test",
      caption: "test",
      imageOrder: 1,
    };
    await expect(
      createImage("album1", data as typeof data)
    ).resolves.not.toThrow();
  });

  it("should get images for an album", async () => {
    const result = await getImages("album1");
    expect(result).toEqual([
      { id: "1", imageUrl: "http://example.com/test.jpg" },
    ]);
  });

  it("should count user images", async () => {
    const result = await getUserImageCount("user1");
    expect(result).toBe(1);
  });
});
