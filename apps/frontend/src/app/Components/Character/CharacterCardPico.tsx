import { CharacterKey } from '@genshin-optimizer/consts';
import { characterAsset } from '@genshin-optimizer/g-assets';
import { Box, CardActionArea, Skeleton, Typography } from '@mui/material';
import { Suspense, useCallback } from 'react';
import Assets from '../../Assets/Assets';
import { getCharSheet } from '../../Data/Characters';
import { ascensionMaxLevel } from '../../Data/LevelData';
import { ElementIcon } from '../../KeyMap/StatIcon';
import useCharacter from '../../ReactHooks/useCharacter';
import useDBMeta from '../../ReactHooks/useDBMeta';
import BootstrapTooltip from '../BootstrapTooltip';
import CardDark from '../Card/CardDark';
import ConditionalWrapper from '../ConditionalWrapper';
import SqBadge from '../SqBadge';

export default function CharacterCardPico({ characterKey = "", index = -1, onClick }: { characterKey: CharacterKey | "", index?: number, onClick?: (characterKey: CharacterKey) => void }) {
  const { gender } = useDBMeta()
  const teammateSheet = characterKey ? getCharSheet(characterKey, gender) : undefined
  const character = useCharacter(characterKey)
  const onClickHandler = useCallback(() => characterKey && onClick?.(characterKey), [characterKey, onClick])
  const actionWrapperFunc = useCallback(
    children => <CardActionArea onClick={onClickHandler}>{children}</CardActionArea>,
    [onClickHandler])
  if (teammateSheet && character) {
    const title = <Suspense fallback={<Skeleton variant="text" width={100} />}>
      <Typography>
        {teammateSheet.elementKey && <ElementIcon ele={teammateSheet.elementKey} iconProps={{
          fontSize: "inherit",
          sx: {
            verticalAlign: "-10%",
            color: `${teammateSheet.elementKey}.main`
          }
        }} />} {teammateSheet.name}
      </Typography>
    </Suspense>

    return <CardDark sx={{ maxWidth: 128, position: "relative", display: "flex", flexDirection: "column", }}>
      <ConditionalWrapper condition={!!onClick} wrapper={actionWrapperFunc}>
        <BootstrapTooltip placement="top" title={title}>
          <Box display="flex" className={`grad-${teammateSheet.rarity}star`}>
            {characterKey && <Box
              component="img"
              src={characterAsset(characterKey, "iconSide", gender)}
              maxWidth="100%"
              maxHeight="100%"
              sx={{ transform: "scale(1.4)", transformOrigin: "bottom" }}
            />}
          </Box>
        </BootstrapTooltip>
        <Typography sx={{ position: "absolute", fontSize: "0.75rem", lineHeight: 1, opacity: 0.85, pointerEvents: "none", top: 0, }}>
          <strong><SqBadge color="primary" >{character.level}/{ascensionMaxLevel[character.ascension]}</SqBadge></strong>
        </Typography>
        <Typography sx={{ position: "absolute", fontSize: "0.75rem", lineHeight: 1, opacity: 0.85, pointerEvents: "none", bottom: 0, right: 0, }}>
          <strong><SqBadge color="secondary" >C{character.constellation}</SqBadge></strong>
        </Typography>
      </ConditionalWrapper>
    </CardDark>
  } else {
    return <CardDark sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: "12.5%" }}>
      <Box component="img" src={Assets.team[`team${index + 2}`]} sx={{ width: "75%", height: "auto", opacity: 0.7 }} />
    </CardDark>
  }
}
