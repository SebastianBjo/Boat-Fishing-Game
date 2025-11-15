def __init__(self):
    super().__init__()
    self.image = pygame.image.load("path/to/assets/boat.png")
    self.rect = self.image.get_rect()
    self.rect.x = WINDOW_WIDTH // 2
    self.rect.y = WINDOW_HEIGHT - 50
