import pygame
import random

# Initialize Pygame
pygame.init()

# Set up the game window
WINDOW_WIDTH = 800
WINDOW_HEIGHT = 600
window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption("Fishing Game")

# Define colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
BLUE = (135, 206, 250)
GREEN = (0, 255, 0)
BROWN = (139, 69, 19)

# Define game constants
BOAT_SPEED = 5
FISH_SPEED = 2
SCALLOP_SPEED = 1
CRAB_SPEED = 3
LOBSTER_SPEED = 2
POINTS = {
    "fish": 1,
    "scallop": 5,
    "crab": 3,
    "lobster": 10,
}
FISHING_METHODS = ["rod", "line", "net", "trap"]
CURRENT_METHOD = "rod"

# Define game objects
class Boat(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((60, 20))  # width 60, height 20
        self.image.fill((139, 69, 19))         # brown color for the boat
        self.rect = self.image.get_rect()
        self.rect.x = WINDOW_WIDTH // 2
        self.rect.y = WINDOW_HEIGHT - 50

    def move(self, direction):
        if direction == "left" and self.rect.x > 0:
            self.rect.x -= BOAT_SPEED
        elif direction == "right" and self.rect.x < WINDOW_WIDTH - self.rect.width:
            self.rect.x += BOAT_SPEED

class FishingCreature(pygame.sprite.Sprite):
    def __init__(self, x, y, speed_x, speed_y, creature_type):
        super().__init__()
        self.image = pygame.Surface((30, 15))  # width 30, height 15
        if creature_type == "fish":
            self.image.fill((0, 105, 148))    # blue
        elif creature_type == "scallop":
            self.image.fill((255, 255, 0))    # yellow
        elif creature_type == "crab":
            self.image.fill((255, 0, 0))      # red
        elif creature_type == "lobster":
            self.image.fill((128, 0, 128))    # purple
        self.rect = self.image.get_rect()
        self.rect.x = x
        self.rect.y = y
        self.speed_x = speed_x
        self.speed_y = speed_y
        self.type = creature_type

    def update(self):
        self.rect.x += self.speed_x
        self.rect.y += self.speed_y
        if self.rect.left < 0 or self.rect.right > WINDOW_WIDTH:
            self.speed_x = -self.speed_x
        if self.rect.top < 0 or self.rect.bottom > WINDOW_HEIGHT:
            self.speed_y = -self.speed_y

# Set up the game objects
boat = Boat()
all_sprites = pygame.sprite.Group()
all_sprites.add(boat)

creature_groups = {
    "fish": pygame.sprite.Group(),
    "scallop": pygame.sprite.Group(),
    "crab": pygame.sprite.Group(),
    "lobster": pygame.sprite.Group(),
}

for _ in range(10):
    fish = FishingCreature(
        random.randint(0, WINDOW_WIDTH),
        random.randint(0, WINDOW_HEIGHT),
        random.randint(-FISH_SPEED, FISH_SPEED),
        random.randint(-FISH_SPEED, FISH_SPEED),
        "fish",
    )
    creature_groups["fish"].add(fish)
    all_sprites.add(fish)

for _ in range(5):
    scallop = FishingCreature(
        random.randint(0, WINDOW_WIDTH),
        random.randint(0, WINDOW_HEIGHT),
        random.randint(-SCALLOP_SPEED, SCALLOP_SPEED),
        random.randint(-SCALLOP_SPEED, SCALLOP_SPEED),
        "scallop",
    )
    creature_groups["scallop"].add(scallop)
    all_sprites.add(scallop)

for _ in range(3):
    crab = FishingCreature(
        random.randint(0, WINDOW_WIDTH),
        random.randint(0, WINDOW_HEIGHT),
        random.randint(-CRAB_SPEED, CRAB_SPEED),
        random.randint(-CRAB_SPEED, CRAB_SPEED),
        "crab",
    )
    creature_groups["crab"].add(crab)
    all_sprites.add(crab)

for _ in range(2):
    lobster = FishingCreature(
        random.randint(0, WINDOW_WIDTH),
        random.randint(0, WINDOW_HEIGHT),
        random.randint(-LOBSTER_SPEED, LOBSTER_SPEED),
        random.randint(-LOBSTER_SPEED, LOBSTER_SPEED),
        "lobster",
    )
    creature_groups["lobster"].add(lobster)
    all_sprites.add(lobster)

# Game variables
score = 0
lives = 3

# Game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                boat.move("left")
            elif event.key == pygame.K_RIGHT:
                boat.move("right")
            elif event.key == pygame.K_SPACE:
                # Catch creatures based on the current fishing method
                caught_creatures = []
                for group_name, group in creature_groups.items():
                    for creature in group:
                        if boat.rect.colliderect(creature.rect):
                            caught_creatures.append(creature)
                            group.remove(creature)
                            all_sprites.remove(creature)
                            score += POINTS[creature.type]

                # Remove caught creatures from the game
                for creature in caught_creatures:
                    all_sprites.remove(creature)

    # Update the game objects
    all_sprites.update()

    # Draw the game objects
    window.fill(BLUE)
    all_sprites.draw(window)

    # Display the score and lives
    font = pygame.font.Font(None, 36)
    score_text = font.render(f"Score: {score}", True, WHITE)
    window.blit(score_text, (10, 10))

    lives_text = font.render(f"Lives: {lives}", True, WHITE)
    window.blit(lives_text, (10, 40))

    # Current fishing method
    method_text = font.render(f"Fishing Method: {CURRENT_METHOD}", True, WHITE)
    window.blit(method_text, (10, 70))

    pygame.display.flip()

# Quit Pygame
pygame.quit()
