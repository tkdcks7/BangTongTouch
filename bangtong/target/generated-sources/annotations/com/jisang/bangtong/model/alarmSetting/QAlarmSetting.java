package com.jisang.bangtong.model.alarmSetting;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAlarmSetting is a Querydsl query type for AlarmSetting
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlarmSetting extends EntityPathBase<AlarmSetting> {

    private static final long serialVersionUID = -1940717278L;

    public static final QAlarmSetting alarmSetting = new QAlarmSetting("alarmSetting");

    public final BooleanPath alarmEmailChat = createBoolean("alarmEmailChat");

    public final BooleanPath alarmEmailComplete = createBoolean("alarmEmailComplete");

    public final BooleanPath alarmEmailInterest = createBoolean("alarmEmailInterest");

    public final NumberPath<Long> alarmId = createNumber("alarmId", Long.class);

    public final BooleanPath alarmPhoneChat = createBoolean("alarmPhoneChat");

    public final BooleanPath alarmPhoneComplete = createBoolean("alarmPhoneComplete");

    public final BooleanPath alarmPhoneInterest = createBoolean("alarmPhoneInterest");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QAlarmSetting(String variable) {
        super(AlarmSetting.class, forVariable(variable));
    }

    public QAlarmSetting(Path<? extends AlarmSetting> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAlarmSetting(PathMetadata metadata) {
        super(AlarmSetting.class, metadata);
    }

}

