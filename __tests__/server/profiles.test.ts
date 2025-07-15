import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../../server/actions/profiles";

jest.mock("../../drizzle/db", () => ({
  db: {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn().mockResolvedValueOnce([
      {
        id: "1",
        displayName: "Test User",
        username: "testuser",
        bio: "hello",
        imageUrl: "https://example.com/image.jpg",
        clerkUserId: "user1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
    query: {
      ProfileTable: {
        findFirst: jest
          .fn()
          .mockResolvedValue({ id: "1", username: "testuser" }),
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

describe("Profiles server actions", () => {
  it("should create a profile", async () => {
    const data = {
      displayName: "Test User",
      username: "testuser",
      bio: "hello",
    };
    await expect(createProfile(data as typeof data)).resolves.not.toThrow();
  });

  it("should get a profile by userId", async () => {
    const result = await getProfile("user1");
    expect(result).toEqual({ id: "1", username: "testuser" });
  });

  it("should update a profile", async () => {
    const data = {
      displayName: "Updated User",
      username: "updateduser",
      bio: "hello",
    };
    await expect(updateProfile(data as typeof data)).resolves.not.toThrow();
  });

  it("should delete a profile", async () => {
    await expect(deleteProfile("user1")).resolves.not.toThrow();
  });
});
