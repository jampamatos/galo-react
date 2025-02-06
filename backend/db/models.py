from sqlalchemy import Boolean, Column, DateTime, Float, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from .base import Base

class League(Base):
    """
    Represents football leagues.
    
    Attributes:
        id (int): Primary key.
        name (str): League name.
        type (str): Type of league ('league' or 'cup').
        logo_url (str): URL to the league's logo.
        country (str): Country where the league is hosted.
        flag_url (str): URL to the country's flag.
    """
    __tablename__ = 'leagues'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    logo = Column(String)
    country = Column(String, nullable=False)
    flag = Column(String)
    
    # Relationships
    seasons = relationship('Season', back_populates='league')
    standing = relationship('Standings', back_populates='league')
    statistics = relationship('TeamStatistics', back_populates='league')
    matches = relationship('Match', back_populates='league')

class Season(Base):
    """
    Represents football seasons.

    Attributes:
        id (int): Primary key.
        league_id (int): Foreign key referencing the League.
        year (int): Year of the season.
        start_date (date): The start date of the season.
        end_date (date): The end date of the season.
        is_current (bool): Indicates if the season is the current one.
    """
    
    __tablename__ = 'seasons'
    
    id = Column(Integer, primary_key=True, nullable=False)
    league_id = Column(Integer, ForeignKey('leagues.id'), nullable=False)
    year = Column(Integer, nullable=False)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    is_current = Column(Boolean, nullable=False)
    
    # Relationships
    league = relationship('League', back_populates='seasons')
    standings = relationship('Standings', back_populates='season')
    statistics = relationship('TeamStatistics', back_populates='season')
    matches = relationship('Match', back_populates='season')

class TeamStatistics(Base):
    """
    Represents football team statistics.
    
    Attributes:
        id (int): Primary key.
        team_id (int): Foreign key referencing the Team.
        league_id (int): Foreign key referencing the League.
        season_id (int): Foreign key referencing the Season.
        form (str): Team's current form.
        games_played (int): Total games played.
        games_home (int): Total home games played.
        games_away (int): Total away games played.
        wins (int): Total wins.
        wins_home (int): Total home wins.
        wins_away (int): Total away wins.
        draws (int): Total draws.
        draws_home (int): Total home draws.
        draws_away (int): Total away draws.
        losses (int): Total losses.
        losses_home (int): Total home losses.
        losses_away (int): Total away losses.
        goals_for (int): Total goals scored.
        goals_against (int): Total goals conceded.
        clean_sheets (int): Total clean sheets.
        failed_to_score (int): Total games where the team failed to score.
        biggest_win_home (str): Biggest win at home.
        biggest_win_away (str): Biggest win away.
        biggest_loss_home (str): Biggest loss at home.
        biggest_loss_away (str): Biggest loss away.
        penalty_scored (int): Total penalties scored.
        penalty_missed (int): Total penalties missed.
        streak_wins (int): Current winning streak.
        streak_draws (int): Current drawing streak.
        streak_losses (int): Current losing streak.
        yellow_cards (int): Total yellow cards.
        red_cards (int): Total red cards.
    """
    
    __tablename__ = 'team_statistics'
    
    id = Column(Integer, primary_key=True)
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=False)
    league_id = Column(Integer, ForeignKey('leagues.id'), nullable=False)
    season_id = Column(Integer, ForeignKey('seasons.id'), nullable=False)
    form = Column(String)
    games_played = Column(Integer)
    games_home = Column(Integer)
    games_away = Column(Integer)
    wins = Column(Integer)
    wins_home = Column(Integer)
    wins_away = Column(Integer)
    draws = Column(Integer)
    draws_home = Column(Integer)
    draws_away = Column(Integer)
    losses = Column(Integer)
    losses_home = Column(Integer)
    losses_away = Column(Integer)
    goals_for = Column(Integer)
    goals_against = Column(Integer)
    clean_sheets = Column(Integer)
    failed_to_score = Column(Integer)
    biggest_win_home = Column(String)
    biggest_win_away = Column(String)
    biggest_loss_home = Column(String)
    biggest_loss_away = Column(String)
    penalty_scored = Column(Integer)
    penalty_missed = Column(Integer)
    streak_wins = Column(Integer)
    streak_draws = Column(Integer)
    streak_losses = Column(Integer)
    yellow_cards = Column(Integer)
    red_cards = Column(Integer)
    
    # Relationships
    team = relationship('Team', back_populates='statistics')
    league = relationship('League', back_populates='statistics')
    season = relationship('Season', back_populates='statistics')

class Stadium(Base):
    """
    Represents football stadiums.
    
    Attributes:
        id (int): Primary key.
        name (str): Stadium name.
        address (str): Stadium address.
        city (str): City where the stadium is located.
        capacity (int): Stadium capacity.
        surface (str): Playing surface.
        image_url (str): URL to the stadium image.
    """
    
    __tablename__ = 'stadiums'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    capacity = Column(Integer)
    surface = Column(String)
    image = Column(String)
    
    # Relationships
    matches = relationship('Match', back_populates='stadium')
    
class Standings(Base):
    """
    Represents team standings in a league season.
    
    Attributes:
        id (int): Primary key.
        team_id (int): Foreign key referencing the Team.
        league_id (int): Foreign key referencing the League.
        season_id (int): Foreign key referencing the Season.
        rank (int): Team's current rank.
        points (int): Team's total points.
        goal_difference (int): Team's goal difference.
        group_name (str): Group name (e.g., 'Group G' for Libertadores).
        form (str): Team's current form.
        status (str): Team's current status.
        games_played (int): Total games played.
        wins (int): Total wins.
        draws (int): Total draws.
        losses (int): Total losses.
        goals_for (int): Total goals scored.
        goals_against (int): Total goals conceded.
        home_games (int): Total home games played.
        home_wins (int): Total home wins.
        home_draws (int): Total home draws.
        home_losses (int): Total home losses.
        home_goals_for (int): Total home goals scored.
        home_goals_against (int): Total home goals conceded.
        away_games (int): Total away games played.
        away_wins (int): Total away wins.
        away_draws (int): Total away draws.
        away_losses (int): Total away losses.
        away_goals_for (int): Total away goals scored.
        away_goals_against (int): Total away goals conceded.
        last_updated (date): Last time the standings were updated.        
    """
    
    __tablename__ = 'standings'
    
    id = Column(Integer, primary_key=True)
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=False)
    league_id = Column(Integer, ForeignKey('leagues.id'), nullable=False)
    season_id = Column(Integer, ForeignKey('seasons.id'), nullable=False)
    rank = Column(Integer)
    points = Column(Integer)
    goal_difference = Column(Integer)
    group_name = Column(String)
    form = Column(String)
    status = Column(String)
    games_played = Column(Integer)
    wins = Column(Integer)
    draws = Column(Integer)
    losses = Column(Integer)
    goals_for = Column(Integer)
    goals_against = Column(Integer)
    home_games = Column(Integer)
    home_wins = Column(Integer)
    home_draws = Column(Integer)
    home_losses = Column(Integer)
    home_goals_for = Column(Integer)
    home_goals_against = Column(Integer)
    away_games = Column(Integer)
    away_wins = Column(Integer)
    away_draws = Column(Integer)
    away_losses = Column(Integer)
    away_goals_for = Column(Integer)
    away_goals_against = Column(Integer)
    last_updated = Column(DateTime)
    
    # Relationships
    team = relationship('Team', back_populates='standings')
    league = relationship('League', back_populates='standings')
    season = relationship('Season', back_populates='standings')
    
class Match(Base):
    """
    Represents football matches.
    
    Attributes:
        id (int): Primary key.
        league_id (int): Foreign key referencing the League.
        season_id (int): Foreign key referencing the Season.
        date (date): Match date.
        round (str): Match round (e.g., '1st Phase').
        venue_id: (int): Foreign key referencing the Stadium.
        home_team_id (int): Foreign key referencing the Home Team.
        away_team_id (int): Foreign key referencing the Away Team.
        home_goals (int): Home team's goals.
        away_goals (int): Away team's goals.
        halftime_home_goals (int): Home team's goals at halftime.
        halftime_away_goals (int): Away team's goals at halftime.
        fulltime_home_goals (int): Home team's goals at fulltime.
        fulltime_away_goals (int): Away team's goals at fulltime.
        extra_time_home_goals (int): Home team's goals in extra time.
        extra_time_away_goals (int): Away team's goals in extra time.
        penalty_home_goals (int): Home team's goals in penalty shootout.
        penalty_away_goals (int): Away team's goals in penalty shootout.
        referee (str): Match referee.
        status (str): Match status (e.g. 'Match Finished', 'Not Started').
        winner (str): Match winner (e.g., 'home', 'away', 'draw' or null).
    """
    
    __tablename__ = 'matches'
    
    id = Column(Integer, primary_key=True)
    league_id = Column(Integer, ForeignKey('leagues.id'), nullable=False)
    season_id = Column(Integer, ForeignKey('seasons.id'), nullable=False)
    date = Column(DateTime, nullable=False)
    round = Column(String)
    venue_id = Column(Integer, ForeignKey('stadiums.id'))
    home_team_id = Column(Integer, ForeignKey('teams.id'), nullable=False)
    away_team_id = Column(Integer, ForeignKey('teams.id'), nullable=False)
    home_goals = Column(Integer)
    away_goals = Column(Integer)
    halftime_home_goals = Column(Integer)
    halftime_away_goals = Column(Integer)
    fulltime_home_goals = Column(Integer)
    fulltime_away_goals = Column(Integer)
    extra_time_home_goals = Column(Integer)
    extra_time_away_goals = Column(Integer)
    penalty_home_goals = Column(Integer)
    penalty_away_goals = Column(Integer)
    referee = Column(String)
    status = Column(String)
    winner = Column(Integer, ForeignKey('teams.id'), nullable=True)
    
    # Relationships
    league = relationship('League', back_populates='matches')
    season = relationship('Season', back_populates='matches')
    stadium = relationship('Stadium', back_populates='matches')
    winning_team = relationship('Team', foreign_keys=[winner])
    statistics = relationship('MatchStatistics', back_populates='match')
    predictions = relationship('MatchPredictions', back_populates='match')
    
    # Using lambda function to defer the evaluation of the home and away team relationships
    home_team = relationship(
        'Team',
        back_populates='home_matches',
        foreign_keys=lambda: [Match.home_team_id]
    )
    away_team = relationship(
        'Team',
        back_populates='away_matches',
        foreign_keys=lambda: [Match.away_team_id]
    )
    
class MatchStatistics(Base):
    """
    Represents a specific match statistics.
    
    Attributes:
        id (int): Primary key.
        match_id (int): Foreign key referencing the Match.
        team_id (int): Foreign key referencing the Team.
        shots_on_goal (int): Total shots on goal.
        shots_off_goal (int): Total shots off goal.
        total_shots (int): Total shots.
        blocked_shots (int): Total blocked shots.
        shots_inside_box (int): Total shots inside the box.
        shots_outside_box (int): Total shots outside the box.
        fouls (int): Total fouls.
        corner_kicks (int): Total corner kicks.
        offsides (int): Total offsides.
        ball_possession (str): Ball possession percentage.
        yellow_cards (int): Total yellow cards.
        red_cards (int): Total red cards.
        goalkeeper_saves (int): Total goalkeeper saves.
        total_passes (int): Total passes.
        passes_accurate (int): Total accurate passes.
        pass_accuracy (str): Pass accuracy percentage.
    """
    
    __tablename__ = 'match_statistics'
    
    id = Column(Integer, primary_key=True)
    match_id = Column(Integer, ForeignKey('matches.id'), nullable=False)
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=False)
    shots_on_goal = Column(Integer)
    shots_off_goal = Column(Integer)
    total_shots = Column(Integer)
    blocked_shots = Column(Integer)
    shots_inside_box = Column(Integer)
    shots_outside_box = Column(Integer)
    fouls = Column(Integer)
    corner_kicks = Column(Integer)
    offsides = Column(Integer)
    ball_possession = Column(String)
    yellow_cards = Column(Integer)
    red_cards = Column(Integer)
    goalkeeper_saves = Column(Integer)
    total_passes = Column(Integer)
    passes_accurate = Column(Integer)
    pass_accuracy = Column(String)
    
    # Relationships
    match = relationship('Match', back_populates='statistics')
    team = relationship('Team', back_populates='statistics')
    
class MatchPredictions(Base):
    """
    Represents incoming match predictions.
    
    Attributes:
        id (int): Primary key.
        match_id (int): Foreign key referencing the Match.
        predicted_winner (str): Predicted match winner.
        win_or_draw (bool): Whether prediction is win or draw.
        under_over (str): Predicted under or over (e.g., -3.5, +2.5).
        goals_home (int): Predicted home team goals.
        goals_away (int): Predicted away team goals.
        advice (str): Prediction advice.
        percent_home (str): Probability of home team winning.
        percent_draw (str): Probability of draw.
        percent_away (str): Probability of away team winning.
        last_updated (date): Last time the predictions were updated.
    """
    
    __tablename__ = 'match_predictions'
    
    id = Column(Integer, primary_key=True)
    match_id = Column(Integer, ForeignKey('matches.id'), nullable=False)
    predicted_winner = Column(String)
    win_or_draw = Column(Boolean)
    under_over = Column(String)
    goals_home = Column(Integer)
    goals_away = Column(Integer)
    advice = Column(String)
    percent_home = Column(String)
    percent_draw = Column(String)
    percent_away = Column(String)
    last_updated = Column(DateTime)
    
    # Relationships
    match = relationship('Match', back_populates='predictions')
    
class Team(Base):
    """
    Represents football teams
    
    Attributes:
        id (int): Primary key.
        name (str): Team name.
        code (str): Team code abbreviation (in this case, CAM)
        country (str): Country where the team is based.
        founded (int): Year the team was founded.
        logo_url (str): URL to the team's logo.
    """
    
    __tablename__ = 'teams'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    code = Column(String)
    country = Column(String, nullable=False)
    founded = Column(Integer)
    logo = Column(String)
    
    # Relationships
    statistics = relationship('TeamStatistics', back_populates='team')
    standings = relationship('Standings', back_populates='team')
    home_matches = relationship('Match', back_populates='home_team', foreign_keys=[Match.home_team_id])
    away_matches = relationship('Match', back_populates='away_team', foreign_keys=[Match.away_team_id])
    players = relationship('Player', back_populates='team')
    
class Player(Base):
    """
    Represents football players.
    
    Attributes:
        id (int): Primary key.
        name (str): Player name.
        first_name (str): Player first name.
        last_name (str): Player last name.
        age (int): Player age.
        birth_date (date): Player birth date.
        birth_place (str): Player birth place (e.g., 'São Paulo').
        birth_country (str): Player birth.
        nationality (str): Player nationality.
        height (int): Player height (e.g., "185 cm").
        weight (int): Player weight (e.g., "75 kg").
        injured (bool): Whether the player is injured.
        photo (str): URL to the player's photo.
        position (str): Player position (e.g., 'Forward').
    """
    
    __tablename__ = 'players'
    
    id = Column(Integer, primary_key=True)
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=False)
    name = Column(String, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    age = Column(Integer)
    birth_date = Column(DateTime)
    birth_place = Column(String)
    birth_country = Column(String)
    nationality = Column(String)
    height = Column(Integer)
    weight = Column(Integer)
    injured = Column(Boolean)
    photo = Column(String)
    position = Column(String)
    
    # Relationships
    team = relationship('Team', back_populates='players')
    statistics = relationship('PlayerStatistics', back_populates='player')
    
class PlayerStatistics(Base):
    """
    Represents football player statistics.
    
    Attributes:
        id (int): Primary key.
        player_id (int): Foreign key referencing the Player.
        team_id (int): Foreign key referencing the Team.
        league_id (int): Foreign key referencing the League.
        season_id (int): Foreign key referencing the Season.
        position (str): Player position.
        appearances (int): Total appearances.
        lineups (int): Total lineups.
        minutes_played (int): Total minutes played.
        rating (float): Player rating.
        captain (bool): Whether the player is captain.
        sub_in (int): Total substitutions in.
        sub_out (int): Total substitutions out.
        bench (int): Total bench appearances.
        shots_total (int): Total shots.
        shots_on_goal (int): Total shots on goal.
        goals_total (int): Total goals.
        assists (int): Total assists.
        goals_conceded (int): Total goals conceded (for goalkeepers).
        goals_saves (int): Total goals saved (for goalkeepers).
        passes_total (int): Total passes.
        passes_key (int): Total key passes.
        passes_accuracy (str): Pass accuracy percentage.
        tackles_total (int): Total tackles.
        tackles_blocks (int): Total blocks.
        tackles_interceptions (int): Total interceptions.
        duels_total (int): Total duels.
        duels_won (int): Total duels won.
        dribbles_attempts (int): Total dribble attempts.
        dribbles_success (int): Total dribble success.
        fouls_drawn (int): Total fouls drawn.
        fouls_committed (int): Total fouls committed.
        yellow_cards (int): Total yellow cards.
        red_cards (int): Total red cards.
        penalties_won (int): Total penalties won.
        penalties_commited (int): Total penalties committed.
        penalties_scored (int): Total penalties scored.
        penalties_missed (int): Total penalties missed.
        penalties_saved (int): Total penalties saved (for goalkeepers).
    """
    
    __tablename__ = 'player_statistics'
    
    id = Column(Integer, primary_key=True)
    player_id = Column(Integer, ForeignKey('players.id'), nullable=False)
    team_id = Column(Integer, ForeignKey('teams.id'), nullable=False)
    league_id = Column(Integer, ForeignKey('leagues.id'), nullable=False)
    season_id = Column(Integer, ForeignKey('seasons.id'), nullable=False)
    position = Column(String)
    appearances = Column(Integer)
    lineups = Column(Integer)
    minutes_played = Column(Integer)
    rating = Column(Float)
    captain = Column(Boolean)
    sub_in = Column(Integer)
    sub_out = Column(Integer)
    bench = Column(Integer)
    shots_total = Column(Integer)
    shots_on_goal = Column(Integer)
    goals_total = Column(Integer)
    assists = Column(Integer)
    goals_conceded = Column(Integer)
    goals_saves = Column(Integer)
    passes_total = Column(Integer)
    passes_key = Column(Integer)
    passes_accuracy = Column(String)
    tackles_total = Column(Integer)
    tackles_blocks = Column(Integer)
    tackles_interceptions = Column(Integer)
    duels_total = Column(Integer)
    duels_won = Column(Integer)
    dribbles_attempts = Column(Integer)
    dribbles_success = Column(Integer)
    fouls_drawn = Column(Integer)
    fouls_committed = Column(Integer)
    yellow_cards = Column(Integer)
    red_cards = Column(Integer)
    penalties_won = Column(Integer)
    penalties_commited = Column(Integer)
    penalties_scored = Column(Integer)
    penalties_missed = Column(Integer)
    penalties_saved = Column(Integer)
    
    # Relationships
    player = relationship('Player', back_populates='statistics')
    team = relationship('Team', back_populates='statistics')
    league = relationship('League', back_populates='statistics')
    season = relationship('Season', back_populates='statistics')
